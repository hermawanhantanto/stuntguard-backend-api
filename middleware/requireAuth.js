import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // eslint-disable-next-line no-undef
    const { id } = jwt.verify(token, process.env.MYSECRET);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user.id;
    next();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
