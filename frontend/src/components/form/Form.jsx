import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin, userProfile } from '../../redux/slices/userThunk';
import { setRememberMe } from '../../redux/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Form() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMeState] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckbox = () => {
        const newRememberMe = !rememberMe;
        setRememberMeState(newRememberMe);
        dispatch(setRememberMe(newRememberMe));
    };

    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('email');
        }
    }, [rememberMe, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Please complete all the fields.");
            return;
        }

        try {
            const token = await dispatch(userLogin(email, password, navigate));
            if (token) {
                dispatch(userProfile(token));
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('email', email);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('email');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content ">
                <FontAwesomeIcon icon="fa fa-user-circle" className="sign-in-icon" />
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete={rememberMe ? "true" : "false"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete={rememberMe ? "true" : "false"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleCheckbox} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}
