import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  console.log(userId)
  console.log(expiresAt)
  try {
    const session = await encrypt({ userId, expiresAt });
    console.log('Generated Session Token:', session); // Log the generated token
    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
  } catch (error) {
    console.error('Session Creation Error:', error);
  }
}

export async function deleteSession() {
    (await cookies()).delete("session");
}

type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}


export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      console.warn('No session token provided');
      return null;
    }
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error('Detailed Verification Error:', error);
    return null;
  }
}

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    // if (!session?.userId) {
    //     redirect('/login')
    // }

    return { isAuth: true, userId: session?.userId }
})
