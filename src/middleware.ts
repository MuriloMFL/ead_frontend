import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServidor";
import { api } from "./servicos/api";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname === "/" ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    const token = await getCookieServer();
    console.log("Token:", token);

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const estaValido = await validarToken(token)

    if (!estaValido) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();

}

async function validarToken(token: string){
    if (!token) return false;

    try{
        await api.get("/detalharusuario", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;

    }catch(err){
        console.log(err);
        return false;
    }
}