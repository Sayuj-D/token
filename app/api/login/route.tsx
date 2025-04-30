import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    // catch the responce sent by the user.
    const { email, password } = await request.json();

    if (email !== "test@gmail.com") {
      return NextResponse.json({ error: "Incorrect Email" }, { status: 401 });
    }

    if (password !== "123") {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }

    // create the JWT token:
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "10s" });
    return NextResponse.json({ token }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Here is the error" }, { status: 500 });
  }
}
