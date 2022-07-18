import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => loginFunction(data);
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
    console.log("loginFunction actived")
    console.log(_data.email)
    console.log(_data.password)

    Axios.post('http://127.0.0.1:5000/api/users/login',
      {
        "user_email": _data.email, "user_password": _data.password
      }).then((response) => {
        if (response.data.status === "ok") {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.users));
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
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      /* eslint-disable */
      navigate('/');
      /* eslint-disable */
    }
    console.log("token : " + token)
  }, []);


  return (
    <div className='box '>
      <div className='panel p-8 m-4 rounded-lg '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center main-topic font-bold text-2xl">Sign in</p>
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
            <div className='my-4'>
              <p className='text-l'>Password</p>
              <input type="password" className="form-label rounded-lg my-2 p-1"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Require with 6 Letters"
                  }
                })}
              ></input>
              <p className='text-red-500 text-sm'>{errors.password?.message}</p>
            </div>
            <div className='mini-bar my-4 '><div className='rememberme text-xs'>
            </div><Link to='/recovery' className='text-xs forgot'>Forgot password?</Link>
            </div>
            <input type="submit" value="SIGN IN" className="main-button p-2 my-4 rounded-lg font-bold text-l"></input>

          </div>  <p className='my-4 text-center text-xs signup'>Don't have an account? <Link to="/register">Sign Up</Link></p>
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

export default LoginPage;