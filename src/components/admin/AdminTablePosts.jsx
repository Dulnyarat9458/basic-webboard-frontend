import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../scss/AdminDashboard.scss'
import AdminContentBtn from './AdminContentBtn'

function AdminTablePosts() {
    const [contentData, setContentData] = useState([]);
    const [topic, setTopic] = useState('');
    const [foundContent, setFoundContent] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = contentData.filter((content) => {
                return content.content_topic.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundContent(results);
        } else {
            setFoundContent(contentData);
        }
        setTopic(keyword);
    };


    useEffect(() => {
        var axios = require('axios');
        var data = '';
        var config = {
            method: 'get',
            url: `${apiUrl}/api/contents`,
            headers: {},
            data: data
        };
        axios(config)
            .then(function (response) {
                setContentData(response.data);
                setFoundContent(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])

    const dataElements = foundContent.map((foundContent, index) => {
        return (
            <TableBody>
                <TableRow key={index}>
                    <TableCell>{foundContent.content_id}</TableCell>
                    <TableCell>{foundContent.content_topic}</TableCell>
                    <TableCell>{foundContent.content_story}</TableCell>
                    <TableCell>{foundContent.content_writer}</TableCell>
                    <TableCell>{foundContent.content_post_time}</TableCell>
                    <TableCell> <AdminContentBtn content_id={foundContent.content_id} content_topic={foundContent.content_topic} content_story={foundContent.content_story} content_writer={foundContent.content_writer} content_writer_id={foundContent.content_writer_id} content_post_time={foundContent.content_post_time} /></TableCell>
                </TableRow>
            </TableBody>
        )
    })

    return (
        <div>
            <input type="search" value={topic} onChange={filter} placeholder="Topic" className='container mx-auto search-input p-2 rounded-lg'></input>
            <br></br>
            <Table size="medium" className='container mx-auto p-16 table-list rounded-lg'>
                <TableHead className='font-bold' >
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>topic</TableCell>
                        <TableCell>content</TableCell>
                        <TableCell>writer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Option</TableCell>
                    </TableRow>
                </TableHead>
                {dataElements}
            </Table>
        </div>
    );
}

export default AdminTablePosts;