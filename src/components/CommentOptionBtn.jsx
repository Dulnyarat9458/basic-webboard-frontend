import React from 'react';
import '../scss/OptionBtn.scss'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

function CommentOptionBtn(props) {
    const { comment_writer_id, comment_id, content_id } = props;
    var userObject = localStorage.getItem('user');
    var _userObject = JSON.parse(userObject)
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    const submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        var axios = require('axios');
                        var config = {
                            method: 'delete',
                            url: `${apiUrl}/api/comments/own/delete/${comment_writer_id}/${comment_id}`,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                        };
                        axios(config)
                            .then(function (response) {
                                window.location.reload(false);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    };

    if (userObject !== null && _userObject.id === comment_writer_id) {
        return (
            <div className='option-content ml-4'>
                <Link to={'/fullcontent/' + comment_id + '/editcomment/'}>
                    <button className='btn op-edit px-2 mx-2 rounded-lg font-semibold'>EDIT</button>
                </Link>
                <button className='btn op-delete px-2 mx-2 rounded-lg font-semibold' onClick={submit}>DELETE</button>
            </div>
        );
    }
}

export default CommentOptionBtn;