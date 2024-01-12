import Cookies from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
// 기본주소 정의 
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true,
});

// 사용자인증 백엔드 전달
export const getMe = () =>
    instance.get(`http://127.0.0.1:8000/user/me`,{
        headers: {
            'Authorization': `Token ${localStorage.getItem("authToken")}`
        },
    })
    .then((response) => response.data);
// 로그아웃 백엔드 전달
export const logOut = () =>
    instance
        .post(`http://127.0.0.1:8000/user/logout`, null, {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
                'Authorization': `Token ${localStorage.getItem("authToken")}`
            },
        })
        .then((response) => {
       
            localStorage.removeItem("authToken");
            return response.data
        });
       
// 로그인 형식 정의
export interface IEmailLoginVariables {
    email: string;
    password: string;
}
// 로그인 성공 정의 
export interface IEmailLoginSuccess {
    ok: string;
    Token: string;
}
// 로그인 에러 정의 
export interface IEmailLoginError {
    error: string;
}
// 로그인 백엔드 전달 
export const emailLogIn = ({
    email,
    password,
}: IEmailLoginVariables) => axios.post<IEmailLoginSuccess>(
    'http://127.0.0.1:8000/user/login',
    { email, password },
    {
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
        withCredentials: true,
    }
// CSRF 토큰 체크 및 백엔드 전달
).then((response) => {
    const token = response.data.Token;
    if (token) {
        localStorage.setItem("authToken", token);
        return { success: true, data: response.data };
    } else {
        return { success: false, error: "Login failed. Please check your credentials." };
    }
}).catch((error: AxiosError<IEmailLoginError>) => {
    if (error.response) {
        return error.response.data;
    } else {
        return { error: error.message };
    }
});
export const getCsrfToken = () => {
    return Cookies.get("csrftoken") || "";
  };