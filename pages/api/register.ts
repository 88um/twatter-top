import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username 
        
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken!' });
    }

    const existingUser2 = await prisma.user.findFirst({
      where: {
         email: email 
        
      }
    });

    if (existingUser2) {
      return res.status(409).json({ message: 'Email is already in use!' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}