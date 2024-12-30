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

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const userInfo = await validarToken(token);

    if (!userInfo) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Inclui informações do usuário nos cookies
    const response = NextResponse.next();
    response.cookies.set("userInfo", JSON.stringify(userInfo));
    return response;
}

async function validarToken(token: string) {
    if (!token) return null;

    try {
        const response = await api.get("/detalharusuario", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; 
    } catch (err) {
        console.log(err);
        return null;
    }
}
