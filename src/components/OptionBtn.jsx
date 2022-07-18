import React from 'react';
import { Link } from 'react-router-dom'
import '../scss/OptionBtn.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from "react-router-dom";
function OptionBtn(props) {
    const { author_id, content_id } = props;
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
                        var axios = require('axios');
                        var config = {
                            method: 'delete',
                            url: 'http://127.0.0.1:5000/api/contents/own/delete/' + author_id + '/' + content_id,
                            headers: {}
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

    

    if (userObject!==null && _userObject.id === author_id) {
        return (
            <div className='option-content ml-4'>
                <Link to={'/fullcontent/' + content_id+'/editcontent'}>
                    <button className='btn op-edit p-2 m-2 rounded-lg font-semibold'>EDIT</button>
                </Link>
                <button className='btn op-delete p-2 m-2 rounded-lg font-semibold' onClick={submit}>DELETE</button>
            </div>
        );
    }
}

export default OptionBtn;