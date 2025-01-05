import { useState, useEffect } from "react";

type UserInfo = {
    id_usuario: string;
    nome_usuario: string;
    tipo_usuario: string;
    login: string;
    id_franquia: string;
    email: string;
};

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("userInfo="));

        if (cookie) {
            const userInfoValue = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
            console.log("Cookie recuperado:", userInfoValue);
            setUserInfo(userInfoValue);
        } else {
            console.log("Cookie userInfo não encontrado!");
        }
    }, []);

    return userInfo;
};

export default useUserInfo;
