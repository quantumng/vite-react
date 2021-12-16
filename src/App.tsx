import { useState, useContext, createContext } from 'react'
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
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

  function useAuth() {
    return useContext(AuthContext);
  }

  function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
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
                    } />
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

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
  
    let from = location.state?.from?.pathname || "/";
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
      let username = formData.get("username") as string;
  
      auth.signin(username, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    }
  
    return (
      <div>
        <p>You must log in to view the page at {from}</p>
  
        <form onSubmit={handleSubmit}>
          <label>
            Username: <input name="username" type="text" />
          </label>{" "}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }


  function ProtectedPage() {
    return <h3>Protected</h3>;
  }

export default App
