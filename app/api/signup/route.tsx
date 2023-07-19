import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt-ts';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { username, email, password } = await request.json();
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({ 
      username: username, 
      email: email, 
      password: hashedPassword 
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  await connectMongoDB();
	const users = await User.find();
	return NextResponse.json({ users });
}