// TODO: Update the auth middleware function to work with the GraphQL API

// import type { Request, Response, NextFunction } from 'express';

import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

export const authenticateToken = ({ req }: { req: any }) => {
  let token = req.body?.token || req.query?.token || req.headers?.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) return req;

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("JWT_SECRET_KEY is not set in environment variables.");

    const { data } = jwt.verify(token, secretKey, { maxAge: "2h" }) as {
      data: JwtPayload;
    };

    req.user = data;
  } catch (err) {
    console.error("Invalid token", err);
  }

  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) throw new Error("JWT_SECRET_KEY is not set in environment variables.");

  return jwt.sign({ data: payload }, secretKey, { expiresIn: "1h" });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}
