import '../scss/Appbar.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'


function Appbar() {

    const logoutFunction = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.clear();
        window.location = '/'
    }
    
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <div className="Appbar text-2xl font-bold py-2  mx-auto">
                <div className=' container adjust-center-appbar '>
                    <button id='logout-btn'  ><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
                    <p className='logo'>Webboard</p>
                    <button id='logout-btn' onClick={logoutFunction}> <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon></button>
                </div>
            </div >
        );
    } else {
        return (
            <div className="Appbar text-2xl font-bold py-2">
                <p className='container mx-auto text-center logo'>Webboard</p>
            </div>
        );
    }


}

export default Appbar;
