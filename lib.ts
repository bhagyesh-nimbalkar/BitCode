import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "5fyvYZW/nNb6Up5d5h7xCJf7ppQLxJ6x3BErMnGif9A=";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (error) {
      console.log("Error during decryption:", error);
      console.log("JWT:", input); 
      throw error; 
    }
}
export async function login({email}:{email:string}) {
  const user = {email};
  try {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });
    (await cookies()).set("session", session, { expires, httpOnly: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires instanceof Date ? parsed.expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
});
  return res;
}