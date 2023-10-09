import React, { useEffect, useState } from "react";
import "./Register.scss";
import TextField from "@mui/material/TextField";
import { AiOutlineEye, AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../store/apiReq";

import { useDispatch } from "react-redux";
const target = document.querySelector(".overlayz");


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => window.scrollTo(0, 0), []);

    const [type, setType] = useState("password");
    const [disabled, setDisabled] = useState(true);

    const re_1digit = new RegExp("^(?=.*[0-9])");
    const re_8chart = new RegExp("^(?=.{8,})");
    const re_low = new RegExp("^(?=.*[a-z])");
    const re_up = new RegExp("^(?=.*[A-Z])");
    const re_spe = new RegExp("^(?=.*[!@#$%^&*])");

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            confirm: "",
            email: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required("Required to enter first and last name")
                .min(4, "Full name requires a minimum of 4 characters"),
            username: Yup.string()
                .required("Requires account entry")
                .min(3, "Account requires a minimum of 3 characters"),
            password: Yup.string()
                .required("Required to enter correct password")
                .matches(/^(?=.*[0-9])/, "Password must contain at least 8 characters"),
            confirm: Yup.string()
                .oneOf([Yup.ref("password"), null], "Re-enter incorrect password")
                .required("Request to re-enter password"),
            email: Yup.string()
                .required("Please enter email")
                .min(8, "Please enter correct email")
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    "Please enter correct email"
                ),
        }),
        onSubmit: (values) => {
            const newUser = {
                fullname: values.fullname,
                username: values.username,
                password: values.password,
                email: values.email,
                // action: "getUserRegister",
            };
            registerUser(newUser, dispatch, navigate)
        },
    });
    useEffect(() => {
        if (
            formik.values.fullname &&
            formik.values.username &&
            formik.values.email &&
            formik.values.password &&
            formik.values.confirm
        ) {
            setDisabled(false);
        }
        else setDisabled(true);
    }, [formik.values.fullname, formik.values.email, formik.values.username, formik.values.password, formik.values.confirm]);

    const icon = document.querySelector(".input__icon");

    return (
        <div className="register__form">
            <form className="form__register" onSubmit={formik.handleSubmit}>
                <div className="title">Register an account</div>
                <TextField
                    name="fullname"
                    id="fullname"
                    label="Full Name"
                    variant="outlined"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                    <div className="error_msg">{formik.errors.fullname}</div>
                ) : null}
                <TextField
                    name="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error_msg">{formik.errors.email}</div>
                ) : null}
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error_msg">{formik.errors.username}</div>
                ) : null}
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={type}
                    variant="outlined"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    InputProps={{
                        endAdornment: (
                            <AiOutlineEye
                                className="input__icon"
                                onClick={() => {
                                    icon.classList.toggle("icon__active");
                                    if (type == "password") setType("text");
                                    else setType("password");
                                }}
                            />
                        ),
                    }}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error_msg">{formik.errors.password}</div>
                ) : null}
                <TextField
                    id="confirm"
                    label="Enter the password"
                    name="confirm"
                    type={type}
                    variant="outlined"
                    value={formik.values.confirm}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="error_msg">{formik.errors.confirm}</div>
                ) : null}
                <div className="footer__form">Password you must have:</div>
                <ul className="check__pw">
                    <li className="">
                        {re_1digit.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck /> At least 1 number
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                At least 1 number
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_8chart.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                At least 8 characters
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                At least 8 characters
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_up.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Capital letters (A-Z)
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Capital letters (A-Z)
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_low.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                                Lowercase letters (a-z)
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Lowercase letters (a-z)
                            </p>
                        )}
                    </li>
                    <li className="">
                        {re_spe.test(formik.values.password) ? (
                            <p className="color">
                                <AiOutlineCheck />
                               Special characters
                            </p>
                        ) : (
                            <p className="">
                                <AiOutlineCheck />
                                Special characters
                            </p>
                        )}
                    </li>
                </ul>
                <p className="dieuKhoan">
                   By clicking the Register button below, I confirm that I have read, understood and agreed
                    idea with the <a href="#" style={{ color: '#ff7809' }}>Terms and Conditions </a>by Book<span style={{ color: '#ff7809' }}>S</span>.
                </p>
                <Button type="submit" variant="contained" disabled={disabled}>
                   Register
                </Button>
                <p className="noti__trans">Already have an account?</p>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                    Log in
                </Button>
            </form>
            {/* <div className="overlayz none">
                <div className="box">

                    <div className="flex">
                        <AiOutlineCloseCircle
                            onClick={(e) => {
                                target.classList.toggle("none");
                            }}
                        />
                        <div className="title">Email Already in use!</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Register;
