import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;
const email = "test@gmail.com";
export async function POST(request: Request) {
  try {
    const { refToken } = await request.json();

    if (!refToken) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    jwt.verify(refToken, SECRET_KEY);

    const newToken = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: "20s",
    });

    return NextResponse.json({ accessToken: newToken }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Some error occured working with reftoken" },
      { status: 401 }
    );
  }
}
