import React from 'react';
import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import '../scss/CommentBox.scss';
import axios from 'axios';
import { Link } from 'react-router-dom'
function CommentBox(props) {
    var userObject = localStorage.getItem('user');
    var _userObject = JSON.parse(userObject)
    const onSubmit = data => writeCommentFunction(data);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { content_id } = props;
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
    const writeCommentFunction = (_data) => {


        var data = JSON.stringify({
            "comment_text": _data.comment,
            "comment_writer_id": _userObject.id,
            "comment_content_id": content_id,
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/api/comments/addcomment',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                // window.location.reload(false);
                setDialog({
                    status: response.data.status + "refresh",
                    message: response.data.msg,
                    isLoading: true,

                },)

                console.log("dia: " + setDialog)



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

    if (userObject === null) {
        return (
            <div className='panel p-8 m-8 rounded-lg comment-box'>
                <div>
                    <h2 className="font-bold mb-8 text-center">Please Sign in to comment</h2>
                    <Link className='link profile-link' to='/login'> <h3 className="font-bold mb-4 text-center">SIGN IN</h3></Link>
                </div>
            </div>)
    } else {
        return (

            <div className='panel p-8 m-8 rounded-lg comment-box'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>   <h2 className="font-bold mb-8">Write your content</h2>
                        <textarea type="text" className="form-label rounded-lg my-2 p-1"
                            {...register("comment", {
                                required: "comment is required"
                            })}
                        ></textarea>
                        <p className='text-red-500 text-sm'>{errors.comment?.message}</p>

                        <input type="submit" value="SUBMIT" className="submit-btn text-center p-2 my-4 rounded-lg font-bold text-l"></input>
                    </div>

                </form>
                {dialog.isLoading && (
                    <SimpleDialog className='sm-dialog'
                        onDialog={acceptResponse}
                        message={dialog.message}
                        status={dialog.status.toUpperCase()}
                    />
                )}
            </div>



        );
    }

}

export default CommentBox;