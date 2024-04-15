import React, { useEffect } from 'react';
import Axios from 'axios';
import { useParams } from "react-router-dom"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentBox from '../components/CommentBox';
import OptionBtn from '../components/OptionBtn';
import CommentOptionBtn from '../components/CommentOptionBtn';
import { faFacebook, faTwitter, faLine } from '@fortawesome/free-brands-svg-icons'

import '../scss/FullContentPage.scss'

function FullContentPage() {
    const { id } = useParams();
    const [content, setContent] = useState([]);
    const [comment, setComment] = useState([]);
    const shareFacebookUrl = "https://www.facebook.com/share.php?u=" + window.location.href;
    const shareTwitterUrl = "http://www.twitter.com/share?url=" + window.location.href;
    const shareLineUrl = "https://social-plugins.line.me/lineit/share?url=" + window.location.href;
    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        var config = {
            method: 'get',
            url: `${apiUrl}/api/contents/${id}`,
            headers: {},
            data: ''
        };

        Axios(config)
            .then(function (response) {
                setContent(response.data[0])
            })
            .catch(function (error) {
                console.error(error);
            });
        callCommentFunction();
    }, []);

    const callCommentFunction = () => {
        var config = {
            method: 'get',
            url: `${apiUrl}/api/comments/${id}`,
            headers: {}
        };
        Axios(config)
            .then(function (response) {
                setComment(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    console.log(comment)

    const commentElements = comment.map((comment, index) => {
        return (
            <ul className='p-4 rounded-lg m-8 content-panel' key={index} >
                <li className='mb-8'>{comment.comment_text}</li>
                <li className='text-sm font-light'>{comment.content_writer}</li>
                <li className='comment-option'>
                    <p className='text-sm font-light'>{comment.comment_date}</p>
                    <CommentOptionBtn comment_id={comment.comment_id} content_id={comment.comment_content_id} comment_writer_id={comment.comment_writer_id} />
                </li>
            </ul>
        );
    })

    return (
        <div className='container mx-auto full-content'>
            <div className='m-8 option-bar'>
                <h1 className='font-bold'>{content.content_topic}</h1>
                <OptionBtn author_id={content.content_author_id} content_id={content.content_id} />
            </div>
            <div className='m-8 social-panel rounded-lg'>
                <h3 className='font-bold p-4 '>Share on</h3>
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
                <div className='social-bar ml-4 p-4'>
                    <a href={shareFacebookUrl} className="p-2" target="_blank"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                    <a href={shareTwitterUrl} className="p-2" target="_blank"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                    <a href={shareLineUrl} className="p-2" target="_blank"><FontAwesomeIcon icon={faLine} size="2x" /></a>
                </div>
            </div>
            <div className='m-8 p-4 rounded-lg content-panel'>
                <p className='mb-8'>{content.content_story}</p>
                <p className='text-sm font-light'>Author: {content.content_writer}</p>
                <p className='text-sm font-light'>{content.content_post_time}</p>
            </div>
            <h2 className='m-16 font-bold text-center'>COMMENT</h2>
            {commentElements}
            <br></br>
            <CommentBox content_id={content.content_id} />
        </div>
    );
}

export default FullContentPage;