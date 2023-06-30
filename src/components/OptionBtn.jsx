import React from 'react';
import { Link } from 'react-router-dom'
import '../scss/OptionBtn.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from "react-router-dom";
function OptionBtn(props) {
    const { author_id, content_id } = props;
    const apiUrl = process.env.REACT_APP_API_URL;
    var userObject = localStorage.getItem('user');
    var _userObject = JSON.parse(userObject)
    let navigate = useNavigate();
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
                            url: `${apiUrl}/api/contents/own/delete/${author_id}/${content_id}`,
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
                                console.error(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
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