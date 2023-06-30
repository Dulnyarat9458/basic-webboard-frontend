import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminUserBtn from './AdminUserBtn'
import { useEffect, useState } from 'react';
import '../../scss/AdminDashboard.scss'


function AdminTableUsers() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = userData.filter((user) => {
                return user.user_email.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(userData);
        }
        setEmail(keyword);
    };

    useEffect(() => {
        const axios = require('axios');
        const data = '';
        const config = {
            method: 'get',
            url: `${apiUrl}/api/users`,
            headers: {},
            data: data
        };
        axios(config)
            .then(function (response) {
                setUserData(response.data);
                setFoundUsers(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])

    const dataElements = foundUsers.map((foundUsers, index) => {
        return (
            <TableBody>
                <TableRow key={index}>
                    <TableCell>{foundUsers.user_id}</TableCell>
                    <TableCell>{foundUsers.user_email}</TableCell>
                    <TableCell>{foundUsers.user_name}</TableCell>
                    <TableCell>{foundUsers.user_gender}</TableCell>
                    <TableCell>{foundUsers.user_role}</TableCell>
                    <TableCell> <AdminUserBtn user_id={foundUsers.user_id} user_email={foundUsers.user_email} user_name={foundUsers.user_name} user_gender={foundUsers.user_gender} user_role={foundUsers.user_role} /></TableCell>
                </TableRow>
            </TableBody>
        )
    })

    return (
        <div>
            <input type="search" value={email} onChange={filter} placeholder="Email" className='container mx-auto search-input p-2 rounded-lg'></input>
            <br></br>
            <Table size="medium" className='container mx-auto p-16 table-list rounded-lg'>
                <TableHead className='font-bold' >
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>gender</TableCell>
                        <TableCell>role</TableCell>
                        <TableCell>Option</TableCell>
                    </TableRow>
                </TableHead>
                {dataElements}
            </Table>
        </div>
    );
}

export default AdminTableUsers;