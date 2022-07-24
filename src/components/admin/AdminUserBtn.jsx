import React from 'react';
import '../../scss/OptionBtn.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert'; // Import
import { Link } from 'react-router-dom'

function AdminUserBtn(props) {

    const { user_id, user_email, user_name, user_gender, user_role } = props;

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
                            url: 'http://127.0.0.1:5000/api/users/' + user_id,
                            headers: {}
                        };
                        axios(config)
                            .then(function (response) {
                                console.log(response);
                                window.location.reload(false);
                            })
                            .catch(function (error) {
                                console.log(error);
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




    return (
        <div className='option-content'>
            {/* <button className='btn op-edit px-2 py-1 mr-2 rounded-lg '>EDIT</button> */}
            <button className='btn op-delete px-2 py-1 rounded-lg ' onClick={submit}>DELETE</button>
        </div>
    );

}

export default AdminUserBtn;