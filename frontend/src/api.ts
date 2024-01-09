import Cookies from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
 
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
});
export const getRooms = () =>
    instance.get(`rooms/`).then((response) => response.data);
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [ _, roomPk ] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
}
 
export const getRoomReviews = async ( { queryKey }: QueryFunctionContext) => {
    const [ _, roomPk ] = queryKey;
    const response = await instance
        .get(`rooms/${roomPk}/reviews`);
    return response.data;
}
export const getMe = () =>
    instance.get(`http://127.0.0.1:8000/user/me`,
    {
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken") || "",
            'Authorization': `Token ${localStorage.getItem("authToken")}`
        },
    }).then((response) => response.data);
 
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
       
export const githubLogIn = (code: string) =>
    instance
        .post(`users/github`,
        {code},
        {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
        .then((response) => response.status);
export const kakaoLogIn = (code: string) =>
    instance
        .post(`users/kakao`,
        {code},
        {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
        .then((response) => response.status);
export interface IEmailLoginVariables {
    email: string;
    password: string;
}
 
export interface IEmailLoginSuccess {
    ok: string;
    Token: string;
}
 
export interface IEmailLoginError {
    error: string;
}
 
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
).then((response) => {
    const token = response.data.Token;
    if (token) {
        localStorage.setItem("authToken", token);
        return { success: true, data: response.data };
    } else {
        return { success: false, error: "Login failed. Please check your credentials." };
    }
}).catch((error: AxiosError<IEmailLoginError>) => {
    // 오류 처리 로직
    if (error.response) {
        // 서버에서 오류 응답이 반환된 경우
        return error.response.data;
    } else {
        // 오류가 네트워크 또는 다른 이유로 인해 발생한 경우
        return { error: error.message };
    }
});
export const getCsrfToken = () => {
    return Cookies.get("csrftoken") || "";
  };