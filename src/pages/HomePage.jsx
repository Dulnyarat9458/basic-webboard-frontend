import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import ContentCard from '../components/ContentCard';
import { Fab } from "react-tiny-fab";
import { Link } from 'react-router-dom';
import 'react-tiny-fab/dist/styles.css';
import '../scss/HomePage.scss'

export default function HomePage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const [content, setContent] = useState([]);
    const contentElements = content.map((content, index) => {
        return <ContentCard key={index} contentData={content} />
    })
    useEffect(() => {
        Axios.post(`${apiUrl}/api/users/auth`,
            {},
            {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then((response) => {
                if (response.data.status === "ok" && response.toString !== null) {
                } else {
                    localStorage.removeItem('token');
                }
            }).catch((err) => {
                localStorage.removeItem('token');
            });

        const config = {
            method: 'get',
            url: `${apiUrl}/api/contents/`,
            headers: {}
        };
        Axios(config)
            .then(function (response) {
                setContent(response.data);
            })
            .catch(function (error) {
                console.error(error);
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