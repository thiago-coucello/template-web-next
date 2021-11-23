import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  switch (method) {
    case "POST": {
      const {
        body: { email, password },
      } = req;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const isEqual = await compare(password, user.password);

        if (isEqual) {
          const payload = {
            id: user.id,
            email: user.email,
          };

          const accessToken = sign(payload, "TESTE_PRISMA_BACKEND", {
            expiresIn: "2h",
          });

          const refreshToken = sign(payload, "TESTE_PRISMA_BACKEND_REFRESH", {
            expiresIn: "7d",
          });

          await prisma.refreshToken.upsert({
            where: {
              userId: user.id,
            },
            create: {
              accessToken,
              refreshToken,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
            update: {
              accessToken,
              refreshToken,
            },
          });

          res.status(200).json({ accessToken, refreshToken });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
      break;
    }
    default: {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
