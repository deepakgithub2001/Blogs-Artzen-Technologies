import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import NavBar from './NavBar';

function Home({ user }) {
    return (
        <div>
            {user ? (
                <div>
                    <p></p>
                </div>
            ) : (
                <p>Creating user...</p>
            )}
            <NavBar />
            <Hero />
            <Footer />
        </div>
    );
}

export default Home;