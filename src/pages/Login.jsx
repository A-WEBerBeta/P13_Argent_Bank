import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearEmail,
  setEmail as setEmailInStore,
  setRemember,
  setToken,
} from "../features/auth/authSlice";

export default function Login() {
  const [email_, setEmail_] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { remember, email } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email_, password }),
    });

    const data = await res.json();
    const token = data?.token ?? data?.body?.token;

    if (token) {
      if (remember) {
        dispatch(setEmailInStore(email_));
      } else {
        dispatch(clearEmail());
      }
      dispatch(setToken(token));
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (remember && email) {
      setEmail_(email);
    }
  }, [remember, email]);

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email_}
                onChange={(e) => setEmail_(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={remember}
                onChange={(e) => dispatch(setRemember(e.target.checked))}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
