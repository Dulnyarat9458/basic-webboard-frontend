import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NewPasswordPage() {
    let navigate = useNavigate();
    var url = window.location.href;
    console.log("url:" + url);
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => newpasswordFunction(data);

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

    const newpasswordFunction = (_data) => {
        console.log("loginFunction actived")
        console.log(_data.password)
        const token = searchParams.get("token")
        console.log("token:" + token);
        var data = JSON.stringify({
            "new_password": _data.password
        });
        var config = {
            method: 'put',
            url: 'http://127.0.0.1:5000/api/users/resetpassword',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };
        Axios(config)
            .then((response) => {
                if (response.data.status === "ok") {
                    navigate('/stage', {
                        state: {
                            status: response.data.status,
                            msg: response.data.msg,
                        }
                    });

                    console.log(response.data);
                } else {
                    setDialog({
                        status: response.data.status,
                        message: response.data.msg,
                        isLoading: true,
                    });
                }
            }).catch((err) => {
                alert(err)
                console.log(err);
            });

    }

    return (
        <div className='box '>
            <div className='panel p-8 m-4 rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-center main-topic font-bold text-2xl">New Password</p>
                    <div >
                        <div className='my-4'>
                            <p className='text-l'>Password</p>
                            <input type="password" className="form-label rounded-lg my-2 p-1"  {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Require with 6 Letters"
                                }
                            })}></input>
                            <p className='text-red-500 text-sm'>{errors.password?.message}</p>
                        </div>
                        <div className='my-4'>
                            <p className='text-l'>Repeat Password</p>
                            <input type="password" className="form-label rounded-lg my-2 p-1"  {...register("password_repeat", {
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })}></input>
                            <p className='text-red-500 text-sm'>{errors.password_repeat?.message}</p>
                        </div>
                        <input type="submit" value="SUBMIT" className="main-button p-2 my-4 rounded-lg font-bold text-l"></input>
                    </div>
                </form>
            </div>

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

export default NewPasswordPage;
