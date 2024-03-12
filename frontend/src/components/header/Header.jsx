import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from './../../assets/img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from "../../redux/slices/userSlice";

export default function Header() {
    const token = useSelector(state => state.user.token);
    const userName = useSelector(state => state.user.user.userName)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={Logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {token ? (
                        <>
                            <Link to="/profile" className="main-nav-item">
                                {userName}
                                <FontAwesomeIcon icon="fa fa-user-circle" />
                            </Link>
                            <Link to="/" className="main-nav-item" onClick={handleLogout}>
                                <FontAwesomeIcon icon="fa fa-power-off" />
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="main-nav-item">
                            <FontAwesomeIcon icon="fa fa-user-circle" />
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
