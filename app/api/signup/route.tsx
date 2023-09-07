import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt-ts';
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const existedUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existedUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        username: email.split('@')[0]
      }
    });
    // console.log("newUser: ", newUser);
    return NextResponse.json(newUser, { status: 200 });

  } catch (error: any) {
    console.log("Sign up post api error: ", error);
    return NextResponse.json({ error: { type: "email", message: error.message }}, { status: 400 });
  }
}

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
	return NextResponse.json({ users }, { status: 200 });
}