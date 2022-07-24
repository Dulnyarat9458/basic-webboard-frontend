import * as React from 'react';
import { useState } from 'react';
import AdminTableUsers from '../../components/admin/AdminTableUsers';
import AdminTablePosts from '../../components/admin/AdminTablePosts';
import AdminTableComments from '../../components/admin/AdminTableComments';
import { useEffect } from 'react';
import Axios from 'axios';
import '../../scss/AdminDashboard.scss'


function AdminDashboard() {
    const [state, setState] = useState('USERS');
    const token = localStorage.getItem('token');
    const [authorization, setAuthorization] = useState(false);

    useEffect(() => {
        Axios.post('http://127.0.0.1:5000/api/users/auth',
            {},
            {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then((response) => {
                console.log("res role: " + response.data.role)
                var userObject = localStorage.getItem('user');
                var _userObject = JSON.parse(userObject)
                if (response.data.status === "ok" && response.toString !== null && response.data.role === 'a') {
                    console.log("auth success" + token);
                    console.log("ADMIN CONFIRMED")
                    setAuthorization(true);
                } else {
                    var data = '';
                    var config = {
                        method: 'get',
                        url: 'http://127.0.0.1:5000/api/users/' + _userObject.id,
                        headers: {},
                        data: data
                    };

                    Axios(config)
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                            localStorage.setItem('user', JSON.stringify(response.data.users));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    console.log("FAKE ADMIN")
                    window.location = '/'
                }
            }).catch((err) => {
                console.log(err)
                console.error('Error:', err);
            });

    }, []);

    if (authorization) {
        return (
            <div className='admin-dashboard'>
                <React.Fragment >
                    <div className='list-menu-option container mx-auto m-8'>
                        <button className='text-center p-2 mx-4 rounded-lg' onClick={() => setState('USERS')}>USERS</button>
                        <button className='text-center p-2 mx-4 rounded-lg' onClick={() => setState('POSTS')}>POSTS</button>
                        <button className='text-center p-2 mx-4 rounded-lg' onClick={() => setState('COMMENTS')}>COMMENTS</button>
                    </div>
                    {state === 'USERS' && (
                        <AdminTableUsers />
                    )}
                    {state === 'POSTS' && (
                        <AdminTablePosts />
                    )}
                    {state === 'COMMENTS' && (
                        <AdminTableComments />
                    )}
                    <br></br>
                </React.Fragment>
            </div>
        );
    }

}

export default AdminDashboard;