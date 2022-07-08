import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import CircularIndeterminate from '../components/CircularLoading';
import Axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

function RecoveryPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => recoveryFunction(data);
    const [loading, setLoading] = useState(false);
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

    const recoveryFunction = (_data) => {

        console.log("loginFunction actived")
        console.log(_data.email)
        console.log(_data.password)
        trackPromise(
            Axios.post('http://127.0.0.1:5000/api/users/recovery',
                {
                    "user_email": _data.email,
                }).then((response) => {
                    console.log(response.data.status)
                    if (response.data.status === "ok") {
                        setDialog({
                            status: response.data.status,
                            message: response.data.msg,
                            isLoading: true,
                        });
                    } else {
                        setDialog({
                            status: response.data.status,
                            message: response.data.msg,
                            isLoading: true,
                        });
                    }
                    setLoading(true);
                }).catch((err) => {
                    alert("Login Faild")
                    console.log(err);
                }));
    }

    return (

        <div className='box '>
            <div className='panel p-8 m-4 rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-center main-topic font-bold text-2xl">Recovery Password</p>
                    <div >
                        <div className='my-4'>
                            <p className='text-l'>Email</p>
                            <input type="text" className="form-label rounded-lg my-2 p-1"
                                {...register("email", {
                                    required: "Email is required", pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Require email format"
                                    }
                                })}
                            ></input>
                            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                        </div>
                        <input type="submit" value="RECOVERY" className="main-button p-2 my-4 rounded-lg font-bold text-l"></input>
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
            <CircularIndeterminate />
        </div>

    );
}

export default RecoveryPage;
