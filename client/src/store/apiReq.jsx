import {
    loginStart,
    loginSuccess,
    loginFalse,
    registerStart,
    registerSuccess,
    registerFalse,
    logOutStart,
    logOutSuccess,
    logOutFalse,
} from "./authSlice";

import { BASE_URL } from "../utils/apiURL";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    await axios.post(`${BASE_URL}auth/login`, user,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
        .then((res) => {
            if (res.data.status == "error") {
                dispatch(loginFalse());
                
                console.log(res.data.message);
                // const target = document.querySelector(".overlayz");
                // setTimeout(() => {
                //     target.classList.toggle("none");
                // }, 3000);
                
            } else { 
                dispatch(loginSuccess(res.data));
                console.log(res.data.message);
               
                navigate("/");
                

                // if (res.data.isAdmin == 'true' || user.isAdmin == 'true')
                //     setTimeout(() => {
                //         dispatch(loginSuccess(res.data));
                //     }, 3000);
            }
        })
        .catch((err) => {
            dispatch(loginFalse());
            console.log(err);
        }
        );
};
export const logoutUser = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        localStorage.removeItem("user");
        await axios.get(`${BASE_URL}auth/logout`)
            .then((res) => {
                dispatch(logOutSuccess());
                console.log(res.data.message);
                navigate("/login");
            });
    } catch (error) {
        dispatch(logOutFalse());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${BASE_URL}auth/register`, user,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .then((res) => {
                if (res.data.status == "success") {
                    alert("Registration successful, Please log in");
                    dispatch(registerSuccess());
                    navigate("/login");
                } else {
                    alert("An error occurred, please try again with another email or username");
                    dispatch(registerFalse());
                }
            });
    } catch (error) {
        dispatch(registerFalse());
    }
};
//BOOK
export const fetchAsyncProducts = createAsyncThunk('books/get', async () => {
    const response = await fetch(`${BASE_URL}book`);
    const data = await response.json();
    return data.data;
});

export const fetchAsyncProductSingle = createAsyncThunk('book-single/get', async (id) => {
    const response = await fetch(`${BASE_URL}book/${id}`);
    const data = await response.json();
    return data.data;
});

//AUTHOR
export const fetchAsyncAuthors = createAsyncThunk('authors/get', async () => {
    const response = await fetch(`${BASE_URL}author`);
    const data = await response.json();
    return data.data;


});

export const fetchAsyncAuthor = createAsyncThunk('author/get', async (id_author) => {
    const response = await fetch(`${BASE_URL}author/${id_author}`);
    const data = await response.json();
    return data.data;
});

//SEARCH







