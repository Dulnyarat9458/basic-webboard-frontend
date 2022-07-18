import Axios from 'axios';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => registerFunction(data);
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


  const loginFunction = (_data) => {
    Axios.post('http://127.0.0.1:5000/api/users/login',
      {
        "user_email": _data.email, "user_password": _data.password
      }).then((response) => {

        if (response.data.status === "ok") {
          localStorage.setItem('token', response.data.token)
          window.location = '/'
          console.log(response.data);
        } else {
          setDialog({
            status: response.data.status,
            message: response.data.msg,
            isLoading: true,
          });
        }
      }).catch((err) => {
        alert("Login Faild")
        console.log(err);
      });
  }

  const registerFunction = (_data) => {
    Axios.post('http://127.0.0.1:5000/api/users/register',
      {
        "user_email": _data.email, "user_password": _data.password, "user_name": _data.name, "user_gender": _data.gender
      }).then((response) => {
        if (response.data.status === "ok") {
          loginFunction(_data)
        } else {
          setDialog({
            status: response.data.status,
            message: response.data.msg,
            isLoading: true,
          });
        }
      }).catch((err) => {
        setDialog({
          status: "Error",
          message: err,
          isLoading: true,
        });
      });
  }

  return (
    <div className='box'>
      <form className="panel p-8 m-4 rounded-lg " onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center main-topic font-bold text-2xl">Sign up</p>
        <div >

          <div className='my-4'>
            <p className='text-l'>Email</p>
            <input type="text" className="form-label rounded-lg my-2 p-1" {...register("email", {
              required: "Email is required", pattern: {
                value: /^\S+@\S+$/i,
                message: "Require email format"
              }
            })}></input>
            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
          </div>
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
          <div className='my-4'>
            <p className='text-l'>Name</p>
            <input type="text" className="form-label rounded-lg my-2 p-1"  {...register("name", { required: "Name is required" })}></input>
            <p className='text-red-500 text-sm'>{errors.name?.message}</p>
          </div>

          <div className='my-4'>
            <p className='text-l'>gender</p>
            <input type="text" className="form-label rounded-lg my-2 p-1" {...register("gender", { required: "Gender is required" })}></input>
            <p className='text-red-500 text-sm'>{errors.gender?.message}</p>
          </div>
          <input type="submit" value="SIGN UP" className="main-button p-2 my-4 rounded-lg font-bold text-l" ></input>
          <p className='my-4 text-center text-xs signup'>Already have an account? <Link to="/">Sign in</Link></p>
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

export default RegisterPage;
