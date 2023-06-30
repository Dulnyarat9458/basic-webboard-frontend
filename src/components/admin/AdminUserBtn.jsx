import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import '../../scss/OptionBtn.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function AdminUserBtn(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user_id } = props;
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
                            url: `${apiUrl}/api/users/${user_id}`,
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
            <button className='btn op-delete px-2 py-1 rounded-lg ' onClick={submit}>DELETE</button>
        </div>
    );

}

export default AdminUserBtn;