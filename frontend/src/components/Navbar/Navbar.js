import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const logo = require("../../images/logo.png")

const Nav = () => {

    const auth = localStorage.getItem('user');  //get user stored in localstorage
    const navigate = useNavigate();

    //clear user data from localstorage and navigate to login page
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    //function to get details of player who raised hand for prize calm
    function RaiseHand(e) {

        //get current time
        var timestamp = Date.now();
        timestamp = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        //get user name
        var user = JSON.parse(localStorage.getItem('user')).name;

        //create a form data with current time and name of user data 
        var formData = new FormData();
        formData.append('Timestamp', timestamp);
        formData.append('Name', user)

        //URL of google sheets api 
        const URL = 'https://script.google.com/macros/s/AKfycbwd2P_htjEqgOllrLlaNhp3qkEv6eCJh3RuweXYbxaSuQM57_HO6Sp3FTGZ7pFeDNE/exec';

        // insert data in google sheet
        fetch(URL, {
            method: "POST",
            body: formData,
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        }).catch((error) => console.log(error))
    }

    return (
        <div className='nav'>
            <img alt={logo} className='logo' src={logo} />
            {

                auth ?
                    // show options to loged in player only
                    <ul className='nav-ul'>
                        <li id='eventHead' ><Link to='/'>Technical Tambola ACM-BU</Link></li>
                        <li>
                            <button id='logout' >
                                <Link onClick={logout} to='/login'>Logout</Link>
                            </button>
                        </li>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li>
                            <a href="https://medicaps.acm.org/index/">ACM-BU</a>
                        </li>
                    </ul>
            }
        </div>
    )
}

export default Nav;