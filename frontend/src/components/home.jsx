import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import url from '../utils/api';

export default function Home() {

    return (
        <div className="home">
            <h1>Welcome to the portal</h1>
            <Link to="/signin">Sign In</Link>
        </div>
    );
}