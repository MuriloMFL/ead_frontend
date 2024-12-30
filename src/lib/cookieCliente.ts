import { getCookie } from "cookies-next"; 

export async function getCookieCliente(){
    const token = getCookie("sessaoEad")

    return token;
}