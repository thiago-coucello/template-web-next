import axios, { AxiosError, AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { APP } from "../../settings/app";
import { AuthTokenError } from "../errors/auth-token-error";

let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError<{ message: string }>) => void;
}[] = [];

export function setupApiClient(
  context?: GetServerSidePropsContext
): AxiosInstance {
  let baseURL;
  let cookies = parseCookies(context);

  if (context) {
    const { req } = context;
    // Server side rendering
    baseURL = "http://" + req.headers.host + "/api";
  } else {
    // Client side rendering
    baseURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "") +
      "/api";
  }

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies[`${APP.name}_AUTH_TOKEN`]}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data.message === "token.invalidOrMissing") {
          if (process.browser) {
            destroyCookie(null, `${APP.name}_AUTH_TOKEN`, {
              path: "/",
            });
            destroyCookie(null, `${APP.name}_AUTH_REFRESH_TOKEN`, {
              path: "/",
            });

            Router.push("/?forced_sign_out=1");
          } else {
            return Promise.reject(new AuthTokenError());
          }
        } else if (error.response.data?.message === "token.expired") {
          const originalConfig = error.config;

          if (!isRefreshing) {
            cookies = parseCookies(context);
            isRefreshing = true;
            const refreshTokenCookie =
              cookies[`${APP.name}_AUTH_REFRESH_TOKEN`];

            api
              .post(`/auth/refresh`, {
                authorization: refreshTokenCookie,
              })
              .then((response) => {
                const { token, refreshToken } = response.data;

                setCookie(context, `${APP.name}_AUTH_TOKEN`, token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                setCookie(
                  context,
                  `${APP.name}_AUTH_REFRESH_TOKEN`,
                  refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  }
                );

                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.resolve(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.reject(err));
                failedRequestsQueue = [];

                if (process.browser) {
                  destroyCookie(null, `${APP.name}_AUTH_TOKEN`, {
                    path: "/",
                  });
                  destroyCookie(null, `${APP.name}_AUTH_REFRESH_TOKEN`, {
                    path: "/",
                  });

                  Router.push("/?forced_sign_out=1");
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                if (originalConfig.headers) {
                  originalConfig.headers["Authorization"] = `Bearer ${token}`;

                  resolve(api(originalConfig));
                }
              },
              reject: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
