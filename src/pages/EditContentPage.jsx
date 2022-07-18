import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import Variables from '../scss/Variables.scss';

function EditContentPage() {
    const { id } = useParams();
    const onSubmit = data => editFunction(data);
    const [contentInfo, setContentInfo] = useState([]);
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
        console.log("ข้อมูล: " + _data.content);
        var token = localStorage.getItem('token');
        var userObject = localStorage.getItem('user');
        var _userObject = JSON.parse(userObject)
        var data = JSON.stringify({
            "content_author_id": _userObject.id,
            "content_id": id,
            "content_topic": _data.topic,
            "content_story": _data.story
        });

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:5000/api/contents/own/update/' + _userObject.id + '/' + id + '',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
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



    useEffect(() => {
        var data = '';
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/contents/'+id,
            headers: {},
            data: data
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data[0]));
                setContentInfo(response.data[0]);
                if (contentInfo) {
                    setValue("topic", response.data[0].content_topic);
                    setValue("story", response.data[0].content_story);
                }
            })
            .catch(function (error) {
                console.log(error);
            });




    }, [])



    return (
        <div className='box'>
            <form className="panel p-8 m-4 rounded-lg " onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center main-topic font-bold text-2xl">Edit your content</p>
                <div >


                    <div className='my-4'>
                        <p className='text-l'>Topic</p>
                        <div className="editor-input">
                            <input id='input-name' disabled={nameDisable} type="text" className="form-label rounded-lg my-2 p-1" {...register("topic", { required: "topic is required" })}></input>
                            <div className="btn-edit" onClick={editNameFunction}>Edit</div>
                        </div>
                        <p className='text-red-500 text-sm'>{errors.topic?.message}</p>

                    </div>

                    <div className='my-4'>
                        <p className='text-l'>Story</p>
                        <div className="editor-input">
                            <textarea id='input-gender' disabled={genderDisable} type="text" className="form-label rounded-lg my-2 p-1" {...register("story", { required: "content is required" })}></textarea>
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

export default EditContentPage;