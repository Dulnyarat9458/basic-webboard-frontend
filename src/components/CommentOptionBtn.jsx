import React from 'react';
import '../scss/OptionBtn.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

function CommentOptionBtn(props) {
    const { comment_writer_id, comment_id, content_id } = props;
    var userObject = localStorage.getItem('user');
    var _userObject = JSON.parse(userObject)
    let navigate = useNavigate();
    const submit = () => {
        console.log("alert toggle")
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log("onclicked")
                        console.log("comment_writer_id: " + comment_writer_id)
                        console.log("comment_id: " + comment_id)
                
                        var axios = require('axios');
                        var config = {
                            method: 'delete',
                            url: 'http://127.0.0.1:5000/api/comments/own/delete/' + comment_writer_id + '/' + comment_id,
                            headers: {}
                        };
                        axios(config)
                            .then(function (response) {
                                window.location.reload(false);
                                console.log(response.data);

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        // alert('Click No')
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