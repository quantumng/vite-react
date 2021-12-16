import { useState, createContext } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import './test.scss'

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
  
  let AuthContext = createContext<AuthContextType>(null!);
  
  function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = useState<any>(null);
  
    let signin = (newUser: string, callback: VoidFunction) => {
      return true;
    };
  
    let signout = (callback: VoidFunction) => {
      return true
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

function App() {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    return (
        <AuthProvider>
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
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/protected"
                    element={
                        <RequireAuth>
                            <ProtectedPage />
                        </RequireAuth>
                    }
                />
        </Route>
            </Routes>
        </div>
        </AuthProvider>
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
