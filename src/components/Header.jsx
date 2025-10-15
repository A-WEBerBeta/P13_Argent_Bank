import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth } from "../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = () => {
    navigate("/login");
    dispatch(clearAuth());
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!token ? (
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <>
            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user?.firstName || "Profile"}
            </Link>
            <Link
              to="/login"
              className="main-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleSignOut();
              }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
