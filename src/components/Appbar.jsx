import '../scss/Appbar.scss';


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBarsStaggered, faTimes, faSigning } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'



function Appbar(props) {

    const [pressed, setPressed] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        var userObject = localStorage.getItem('user');
        var _userObject = JSON.parse(userObject)
        setUser(_userObject);
        console.log("APPBAR CHANGE");
    }, [])


    const logoutFunction = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        window.location = '/'
    }

    const openMenuFunction = (event) => {
        if (!pressed) {
            document.getElementById("menubar").style.maxHeight = "500px";
            setPressed(true);
        } else {
            document.getElementById("menubar").style.maxHeight = "0px";
            setPressed(false);
        }
    }

    const closeMenuFunction = (event) => {
        document.getElementById("menubar").style.maxHeight = "0px";
        setPressed(false);
    }

    const token = localStorage.getItem('token');




    if (token) {

        return (
            <div className='appbar-panel'>
                <div className="Appbar text-2xl font-bold py-2  mx-auto">
                    <div className=' container adjust-center-appbar '>
                        <FontAwesomeIcon icon={pressed ? faTimes : faBarsStaggered} onClick={openMenuFunction} className="icon-properties pl-8"></FontAwesomeIcon >
                        <p className='logo'>Webboard</p>
                        <div className='icon-properties pl-8'></div>
                    </div>

                </div >
                <div className='menubar' id='menubar'>
                    <ul id='menubar-menu'>
                        <Link className='link' to='/' onClick={closeMenuFunction}> <li className='py-5 '><div className='container mx-auto pl-8'>HOME</div></li></Link>
                        <Link className='link profile-link' to='/profile' onClick={closeMenuFunction}>
                            <li className='py-5 '>
                                <div className='container mx-auto pl-8 pf'>
                                    <img src='https://i0.wp.com/sidadventist.org/wp-content/uploads/2021/08/person-icon.png?ssl=1'></img>
                                    <div>
                                        <p className='text-sm'> {user.name}</p>
                                        <p className='text-xs font-extralight'> {user.email}</p>
                                    </div>
                                </div>
                            </li></Link>
                        <Link className='link' to='/mypost' onClick={closeMenuFunction}><li className='py-5 '><div className='container mx-auto pl-8'>MY CONTENT</div></li></Link>
                        <div className='logout' onClick={logoutFunction}><li className='py-5 '><div className='container mx-auto pl-8'>SIGN OUT</div></li></div>
                    </ul>
                </div>
            </div>
        );


    } else {
        return (
            <div className='appbar-panel'>
                <div className="Appbar text-2xl font-bold py-2  mx-auto">
                    <div className=' container adjust-center-appbar '>
                        <FontAwesomeIcon icon={pressed ? faTimes : faBarsStaggered} onClick={openMenuFunction} className="icon-properties pl-8"></FontAwesomeIcon >
                        <p className='logo'>Webboard</p>
                        <div className='icon-properties pl-8'></div>
                    </div>

                </div >
                <div className='menubar' id='menubar'>
                    <ul id='menubar-menu'>
                        <Link className='link' to='/' onClick={closeMenuFunction}> <li className='py-5 '><div className='container mx-auto pl-8'>HOME</div></li></Link>
                        <Link className='link' to='/login' onClick={closeMenuFunction}><li className='py-5 '><div className='container mx-auto pl-8'>SIGN IN</div></li></Link>

                    </ul>
                </div>
            </div>
        );
    }
}

export default Appbar;
