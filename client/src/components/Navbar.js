import React from 'react'
import navbar from './navbar.css'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/home">Book It Up!</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" >
                        <i class="fa fa-hamburger" style={{ color: "white" }}>
                        </i>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-auto">
                        {user ? (
                            <>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className='fa fa-user'></i>{user.name}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a class="dropdown-item" href="#" onClick={logout}>Log out</a></li>

                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/register">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li></>)}


                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar