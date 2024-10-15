// src/components/AuthPage/AuthPage.jsx
import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import Register from '../Register/Register';
import SignIn from "../Register/SignIn"
import { Link } from 'react-router-dom';
const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('register');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <h2>Register/Login</h2>
            <div className={styles.tab}>
                <button
                    className={`${styles.btn} ${activeTab === 'register' ? styles.active : ''}`}
                    onClick={() => handleTabClick('register')}
                    aria-pressed={activeTab === 'register'}
                >
                    Register
                </button>
                <button
                    className={`${styles.btn} ${activeTab === 'login' ? styles.active : ''}`}
                    onClick={() => handleTabClick('login')}
                    aria-pressed={activeTab === 'login'}
                >
                    Login
                </button>
                {/* Slider for button background */}
                <div
                    className={styles.slider}
                    style={{
                        transform: activeTab === 'register' ? 'translateX(0%)' : 'translateX(100%)',
                    }}
                ></div>
            </div>
            <div
                className={styles.mainContainer}
                style={{
                    transform: activeTab === 'register' ? 'translateX(25%)' : 'translateX(-25%)',
                }}
            >
                <div className={styles.left}
                    style={{
                        opacity: activeTab === 'register' ? 1 : 0
                    }}
                >
                    {/* Register Form Content */}
                    <Register />
                    <>Already Registered?<Link onClick={() => handleTabClick('login')}
                        aria-pressed={activeTab === 'login'}>Sign in</Link></>
                </div>
                <div className={styles.right}
                    style={{
                        opacity: activeTab === 'login' ? 1 : 0
                    }}
                >
                    <SignIn />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
