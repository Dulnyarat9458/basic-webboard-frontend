import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import Variables from '../scss/Variables.scss';


function EditCommentPage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    let navigate = useNavigate();
    const { id } = useParams();
    const onSubmit = data => editFunction(data);
    const [commentInfo, setCommentInfo] = useState([]);
    const [genderDisable, setGenderDisable] = useState(true);
    const { register, handleSubmit, formState: { errors },  setValue } = useForm({ mode: 'onBlur' });
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
        const token = localStorage.getItem('token');
        const userObject = localStorage.getItem('user');
        const _userObject = JSON.parse(userObject)
        const data2 = JSON.stringify({
            "comment_writer_id": _userObject.id,
            "comment_id": id,
            "comment_text": _data.comment,
        });

        const config2 = {
            method: 'put',
            url: `${apiUrl}/api/comments/own/update/${_userObject.id }/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data2
        };

        Axios(config2)
            .then(function (response) {
                navigate("/fullcontent/" + commentInfo.comment_content_id);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const editGenderFunction = () => {
        document.getElementById("input-gender").style.backgroundColor = Variables.basecolor2;
        setGenderDisable(false);
    }

    useEffect(() => {
        const userObject = localStorage.getItem('user');
        const _userObject = JSON.parse(userObject)
        const data = '';
        const config = {
            method: 'get',
            url: `${apiUrl}/api/comments/only/${id}` ,
            headers: {},
            data: data
        };

        Axios(config)
            .then(function (response) {
                setCommentInfo(response.data[0]);
                if (commentInfo) {
                    setValue("comment", response.data[0].comment_text);
                }
            })
            .catch(function (error) {
                console.error(error);
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