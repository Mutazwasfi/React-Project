import React from 'react'
import './ChangePassword.scss'
import { useState, useEffect } from 'react';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';
import { AiOutlineCheck } from "react-icons/ai";
import { Col, Row } from 'antd';
function ChangePassword() {

    const re_1digit = new RegExp("^(?=.*[0-9])");
    const re_8chart = new RegExp("^(?=.{8,})");
    const re_low = new RegExp("^(?=.*[a-z])");
    const re_up = new RegExp("^(?=.*[A-Z])");
    const re_spe = new RegExp("^(?=.*[!@#$%^&*])");

    const formik = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            confirm: ""
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string()
                .required("Requires entering current password"),
            newpassword: Yup.string()
                .required("Required to enter correct password")
                .matches(/^(?=.*[0-9])/, "Password must contain at least 8 characters"),
            confirm: Yup.string()
                .oneOf([Yup.ref("newpassword"), null], "Re-enter incorrect password")
                .required("Request to re-enter password"),
        }),
        onSubmit: async (values) => {
            const updateUser = {
                oldPassword: values.oldpassword,
                newPassword: values.newpassword,
            };
            await axios.post(`${BASE_URL}auth/updatepassword`, updateUser, { withCredentials: true })
                .then(res => {
                    if (res.data.status === "success") {
                        alert("Password changed successfully");
                        formik.resetForm();
                    }
                    else {
                        alert("Password change failed");
                    }
                }
                )
        },
    });
    return (
        <div className='change-password'>
            <h1>Change Password</h1>
            <div className='container-change'>
                <form className="form-change" onSubmit={formik.handleSubmit}>
                    <div className='setpassword'>
                        <p >Old password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="oldpassword"
                                id="oldpassword"
                                placeholder="Old password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.oldpassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.oldpassword && formik.errors.oldpassword ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.oldpassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='setpassword'>
                        <p >New password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="newpassword"
                                id="newpassword"
                                placeholder="New password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.newpassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.newpassword && formik.errors.newpassword ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.newpassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='setpassword'>
                        <p >Confirm password: </p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input.Password
                                name="confirm"
                                id="confirm"
                                placeholder="Confirm password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: 400, height: 50 }}
                                value={formik.values.confirm}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirm && formik.errors.confirm ? (
                                <div className="error" style={{ marginLeft: '10px' }}>{formik.errors.confirm}</div>
                            ) : null}
                        </div>
                    </div>
                    <Button type="submit" variant="contained" style={{ width: 400, height: 50, marginBottom: 20, marginTop: 30 }}>Change Password</Button>
                </form>
                <div className='require'>
                    <div className="footer__form">Password you must have: </div>
                    <ul className="check__pw">
                        <li className="">
                            {re_1digit.test(formik.values.newpassword) ? (
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
                            {re_8chart.test(formik.values.newpassword) ? (
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
                            {re_up.test(formik.values.newpassword) ? (
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
                            {re_low.test(formik.values.newpassword) ? (
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
                            {re_spe.test(formik.values.newpassword) ? (
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
                </div>
            </div>
        </div>
    )
}

export default ChangePassword