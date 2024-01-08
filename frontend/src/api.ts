import Cookies from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
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
    instance.get(`http://127.0.0.1:8000/user/me`,{
        headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
                'Authorization': `Token ${localStorage.getItem("authToken")}`
        },
    }
    ).then((response) => response.data);

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
            return response.data;
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
export interface IUsernameLoginVariables {
    username: string;
    password: string;
}
export interface IUsernameLoginSuccess {
    ok: string;
}
export interface IUsernameLoginError {
    error: string;
}
export const usernameLogIn = ({
    username,
    password,
}: IUsernameLoginVariables) => axios.post(
    'http://127.0.0.1:8000/user/login',
    {username, password},
    {
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
        withCredentials: true,
    })
    .then((response) => {
        console.log('토큰 생성')
        const token = response.data.Token;
        if (token) {
            localStorage.setItem("authToken", token);
        }
        return response.data;
    });
    
    export interface IUsernameSignUpVariables {
          username: string;
          password: string;
          email: string;
          name: string;
        }
      