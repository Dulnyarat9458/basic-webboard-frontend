import '../scss/Form.scss';
import { SimpleDialog } from '../components/Dialog'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function WriteContentPage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => writeContentFunction(data);
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

    const writeContentFunction = (_data) => {
        const userObject = localStorage.getItem('user');
        const _userObject = JSON.parse(userObject)
        const data = JSON.stringify({
            "content_topic": _data.topic,
            "content_story": _data.content,
            "content_author_id": _userObject.id
        });

        const config = {
            method: 'post',
            url: `${apiUrl}/api/contents/addcontent`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                navigate('/stage', {
                    state: {
                        status: response.data.status,
                        msg: response.data.msg,
                    }
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <div className='box '>
            <div className='panel p-8 m-4 rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-center main-topic font-bold text-2xl">Write your content</p>
                    <div>
                        <div className='my-4'>
                            <p className='text-l'>Topic</p>
                            <input type="text" className="form-label rounded-lg my-2 p-1"
                                {...register("topic", {
                                    required: "Topic is required"
                                })}
                            ></input>
                            <p className='text-red-500 text-sm'>{errors.topic?.message}</p>
                        </div>

                        <div className='my-4'>
                            <p className='text-l'>Your Content</p>
                            <textarea type="text" className="form-label rounded-lg my-2 p-1"
                                {...register("content", {
                                    required: "Content is required"
                                })}
                            ></textarea>
                            <p className='text-red-500 text-sm'>{errors.content?.message}</p>
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

export default WriteContentPage;