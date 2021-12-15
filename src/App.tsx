import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import './test.scss'

function App() {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    return (
        <div className="App">
            <header className="App-header">
                <p className='uni'>Hello, {userInfo.name || 'There'}</p>
                <p>
                    <Link to="/">Home</Link>
                    {' | '}
                    <Link to="/about">About</Link>
                </p>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>
        </div>
    )
}

function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
                <p>You can do this, I believe in you.</p>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </>
    );
}

function About() {
    return (
        <>
            <main>
                <h2>Who are we?</h2>
                <p>
                    That feels like an existential question, don't you
                    think?
                </p>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default App
