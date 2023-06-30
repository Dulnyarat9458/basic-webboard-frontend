import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminCommentBtn from './AdminCommentBtn'
import { useEffect } from 'react';
import { useState } from 'react';
import '../../scss/AdminDashboard.scss'


function AdminTableComments() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [commentData, setCommentData] = useState([]);
    const [tcomment, setTcomment] = useState('');
    const [foundComment, setFoundComment] = useState([]);
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = commentData.filter((comment) => {
                return comment.comment_text.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundComment(results);
        } else {
            setFoundComment(commentData);
        }
        setTcomment(keyword);
    };

    useEffect(() => {
        var axios = require('axios');
        var data = '';
        var config = {
            method: 'get',
            url: `${apiUrl}/api/comments`,
            headers: {},
            data: data
        };
        axios(config)
            .then(function (response) {
                setCommentData(response.data);
                setFoundComment(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });

    }, [])

    const dataElements = foundComment.map((foundComment, index) => {
        return (
            <TableBody>
                <TableRow key={index}>
                    <TableCell>{foundComment.comment_id}</TableCell>
                    <TableCell>{foundComment.comment_text}</TableCell>
                    <TableCell>{foundComment.content_topic}</TableCell>
                    <TableCell>{foundComment.comment_writer}</TableCell>
                    <TableCell>{foundComment.comment_date}</TableCell>
                    <TableCell> <AdminCommentBtn comment_id={foundComment.comment_id} comment_text={foundComment.comment_text} content_topic={foundComment.content_topic} comment_writer={foundComment.comment_writer} comment_writer_id={foundComment.comment_writer_id} comment_date={foundComment.comment_date} /></TableCell>
                </TableRow>
            </TableBody>
        )
    })

    return (
        <div>
            <input type="search"  value={tcomment} onChange={filter}  placeholder="comment" className='container mx-auto search-input p-2 rounded-lg'></input>
            <br></br>
            <Table size="medium" className='container mx-auto p-16 table-list rounded-lg'>
                <TableHead className='font-bold' >
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>comment</TableCell>
                        <TableCell>content topic</TableCell>
                        <TableCell>writer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Option</TableCell>
                    </TableRow>
                </TableHead>
                {dataElements}
            </Table>
        </div >
    );
}

export default AdminTableComments;