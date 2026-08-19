"use client";

import React from "react";
import styles from "./header.module.scss";
import Link from "next/dist/client/link";
import { LayoutDashboard, ShoppingCart } from "lucide-react";

export default function Header(){
    const totalItems = 2;
    const isAuthenticated = false;

    const handleDasheboardClick = () => {
        // navigate to dashboard 
    }

    const handleLogoutClick = () => {
        // handle logout logic
    }

    const handleLoginClick = () => {
        // handle login logic
    }

    return (
    <header className={styles.header}>
        {/* container */}
        <div className={styles.container}>
            {/* logo */}
            <Link href="/" className={styles.logo}>
                STOREFONT
            </Link>
            {/* icon */}
            <div className={styles.actions}>
                <Link href="/cart" className={styles.cartButton}> 
                    <ShoppingCart size={20}/>
                    {
                        totalItems > 0 && (
                        <span className={styles.badge}>{totalItems}</span>
                    )}
                </Link>
                {
                    isAuthenticated ? (
                        <>
                            <LayoutDashboard onClick={handleDasheboardClick} />
                            <button 
                                onClick={handleLogoutClick}
                                className={styles.logoutButton}
                            >
                                Logout
                            </button>
                        </>
                    ):(
                        <button className={styles.loginButton} onClick={handleLoginClick}>
                            Login
                        </button>
                    )
                }
            </div>
        </div>
    </header>
    )
}