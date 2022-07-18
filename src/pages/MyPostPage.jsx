import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../scss/MyPostPage.scss'
import { Link } from 'react-router-dom'
function MyPostPage() {

    const [userPost, setUserPost] = useState([]);

    useEffect(() => {

        const userObject = localStorage.getItem('user');
        var _userObject = JSON.parse(userObject)

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/contents/own/' + _userObject.id,
            headers: {}
        };

        Axios(config)
            .then(function (response) {
                console.log(response.data)
                setUserPost(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const postElements = userPost.map(userPost => {
        return (
            <Link to={'/fullcontent/' + userPost.content_id}>
                <ul className='p-4 rounded-lg my-8 '>
                    <li>Title: {userPost.content_topic}</li>
                    <li>{userPost.content_post_time}</li>
                </ul>
            </Link>
        );
    })


    return (
        <div className='container mx-auto my-post-panel'>
            <h1 className='m-8 font-bold'>My Content</h1>
            <div className='m-8'>
                {postElements}
            </div>
        </div>

    );
}

export default MyPostPage;