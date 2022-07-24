import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import Variables from '../scss/Variables.scss';


function EditCommentPage() {
    let navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = data => editFunction(data);
    const [commentInfo, setCommentInfo] = useState([]);
    const [nameDisable, setNameDisable] = useState(true);
    const [genderDisable, setGenderDisable] = useState(true);
    const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({ mode: 'onBlur' });


    console.log("Variables: " + Variables.basecolor1)
    console.log("comment_id: " + id)
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
        console.log("ข้อมูล: " + _data.comment);
        var token = localStorage.getItem('token');
        var userObject = localStorage.getItem('user');
        var _userObject = JSON.parse(userObject)

        var data2 = JSON.stringify({
            "comment_writer_id": _userObject.id,
            "comment_id": id,
            "comment_text": _data.comment,
        });

        var config2 = {
            method: 'put',
            url: 'http://127.0.0.1:5000/api/comments/own/update/' + _userObject.id + '/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data2
        };

        Axios(config2)
            .then(function (response) {
                console.log("GET: " + JSON.stringify(response.data));
                // window.location.reload(false);
                navigate("/fullcontent/" + commentInfo.comment_content_id);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    const editGenderFunction = () => {
        document.getElementById("input-gender").style.backgroundColor = Variables.basecolor2;
        setGenderDisable(false);
    }



    useEffect(() => {
        var userObject = localStorage.getItem('user');
        var _userObject = JSON.parse(userObject)
        var data = '';
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/comments/only/' + id,
            headers: {},
            data: data
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setCommentInfo(response.data[0]);
                if (commentInfo) {
                    setValue("comment", response.data[0].comment_text);
                }
                console.log("eeeee = " + commentInfo.comment_content_id)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <div className='box'>
            <form className="panel p-8 m-4 rounded-lg " onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center main-topic font-bold text-2xl">Edit your comment</p>
                <div >
                    <div className='my-4'>
                        <p className='text-l'>Comment</p>
                        <div className="editor-input">
                            <textarea id='input-gender' disabled={genderDisable} type="text" className="form-label rounded-lg my-2 p-1" {...register("comment", { required: "content is required" })}></textarea>
                            <div className="btn-edit" onClick={editGenderFunction}>Edit</div>
                        </div>
                        <p className='text-red-500 text-sm'>{errors.story?.message}</p>
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

export default EditCommentPage;