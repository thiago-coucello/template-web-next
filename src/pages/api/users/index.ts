import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  switch (method) {
    case "GET": {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      break;
    }
    case "POST": {
      const {
        body: { email, password },
      } = req;

      const hashedPassword = await hash(password, 12);
      const newUser = prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json(newUser);
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
