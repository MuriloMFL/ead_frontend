'use server'

import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("sessaoEad")?.value;
  return token || null;
}
