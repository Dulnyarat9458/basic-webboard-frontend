import '../scss/ProfilePage.scss';
import Variables from '../scss/Variables.scss';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import React, { useState, useRef, useEffect } from 'react';
import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'

function ProfilePage() {
    const onSubmit = data => editFunction(data);
    const [userInfo, setUserInfo] = useState([]);
    const [nameDisable, setNameDisable] = useState(true);
    const [genderDisable, setGenderDisable] = useState(true);
    const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({ mode: 'onBlur' });


    console.log("Variables: " + Variables.basecolor1)
    const [dialog, setDialog] = useState({
        status: "",
        message: "",
        isLoading: false,
    });

    const handleDialog = (status, message, isLoading) => {
        setDialog({
            status,
            message,
            isLoading,
        });
    };

    const acceptResponse = () => {
        handleDialog("", false);
    };
    const editFunction = (_data) => {

        var token = localStorage.getItem('token');
        var data = JSON.stringify({
            "user_id": userInfo.id,
            "user_name": _data.name,
            "user_gender": _data.gender,
            "user_email": userInfo.email,
            "user_role": userInfo.role
        });

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:5000/api/users/updateprofile',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.users));
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
                setDialog({
                    status: "error",
                    message: error,
                    isLoading: true,
                });
            });

    }
    const editNameFunction = () => {
        document.getElementById("input-name").style.backgroundColor = Variables.basecolor2;
        setNameDisable(false);
    }
    const editGenderFunction = () => {
        document.getElementById("input-gender").style.backgroundColor = Variables.basecolor2;
        setGenderDisable(false);
    }


    var userObject = localStorage.getItem('user');
    var _userObject = JSON.parse(userObject)
    useEffect(() => {

        setUserInfo(_userObject);
        if (userInfo) {
            setValue("email", userInfo.email);
            setValue("name", userInfo.name);
            setValue("gender", userInfo.gender);
        }
    }, [userInfo.email])



    return (
        <div className='box'>
            <form className="panel p-8 m-4 rounded-lg " onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center main-topic font-bold text-2xl">PROFILE</p>
                <div >

                    <div className='my-4'>
                        <p className='text-l'>Email</p>
                        <input id='input-email' disabled="true" type="text" className="form-label rounded-lg my-2 p-1"  {...register("email", {
                            required: "Email is required", pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Require email format"
                            }
                        })}></input>
                        <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                    </div>

                    <div className='my-4'>
                        <p className='text-l'>Name</p>
                        <div className="editor-input">
                            <input id='input-name' disabled={nameDisable} type="text" className="form-label rounded-lg my-2 p-1" {...register("name", { required: "Name is required" })}></input>
                            <div className="btn-edit" onClick={editNameFunction}>Edit</div>
                        </div>
                        <p className='text-red-500 text-sm'>{errors.name?.message}</p>

                    </div>

                    <div className='my-4'>
                        <p className='text-l'>gender</p>
                        <div className="editor-input">
                            <input id='input-gender' disabled={genderDisable} type="text" className="form-label rounded-lg my-2 p-1" {...register("gender", { required: "Gender is required" })}></input>
                            <div className="btn-edit" onClick={editGenderFunction}>Edit</div>
                        </div>
                        <p className='text-red-500 text-sm'>{errors.gender?.message}</p>
                    </div>
                    <input type="submit" value="SAVE" className="main-button p-2 my-4 rounded-lg font-bold text-l" ></input>

                </div>
            </form>
            {dialog.isLoading && (
                <SimpleDialog
                    onDialog={acceptResponse}
                    message={dialog.message}
                    status={dialog.status.toUpperCase()}
                />
            )}
        </div>
    );
}

export default ProfilePage;