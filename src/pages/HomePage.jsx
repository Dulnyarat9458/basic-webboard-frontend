import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import ContentCard from '../components/ContentCard';
import { Fab } from "react-tiny-fab";
import { Link } from 'react-router-dom';
import 'react-tiny-fab/dist/styles.css';
import '../scss/HomePage.scss'


export default function HomePage() {
    const token = localStorage.getItem('token');
    const [content, setContent] = useState([]);

    const contentElements = content.map((content, index) => {
        return <ContentCard key={index} contentData={content} />
    })
    useEffect(() => {
        Axios.post('http://127.0.0.1:5000/api/users/auth',
            {},
            {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then((response) => {
                console.log("res: " + response.data.status)
                if (response.data.status === "ok" && response.toString !== null) {
                    console.log("auth success" + token);
                } else {
                    localStorage.removeItem('token');

                }
            }).catch((err) => {
                localStorage.removeItem('token');
                // window.location = '/'
                console.log(err)
                console.error('Error:', err);
            });


        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/contents/',
            headers: {}
        };

        Axios(config)
            .then(function (response) {
                setContent(response.data);
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    if (token !== null) {
        return (
            <div className='container mx-auto'>
                <div className='grid  sm:grid-cols-2  xl:grid-cols-3'>
                    {contentElements}
                </div>
                <Fab icon={<Link to="/writecontent" className='btn-link'>+</Link>} event='null' >
                </Fab>
            </div>

        );
    } else {
        return (
            <div className='container mx-auto'>
                <div className='grid  sm:grid-cols-2  xl:grid-cols-3'>
                    {contentElements}
                </div>
            </div>

        );
    }

}