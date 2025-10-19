import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // pas de token -> retour login
      return;
    }

    fetch(import.meta.env.VITE_API_BASE_URL + "/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // ici, preuve de la connexion
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUser(data.body));
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate, dispatch, token]);

  const handleSave = async () => {
    if (!token) return navigate("/login");

    const res = await fetch(
      import.meta.env.VITE_API_BASE_URL + "/user/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      }
    );

    const data = await res.json();

    if (res.ok && data?.body) {
      dispatch(setUser(data.body));
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            <>
              <h1>
                Welcome back
                <br />
                {user.firstName} {user.lastName}!
              </h1>
              <button
                className="edit-button"
                onClick={() => {
                  setFirstName(user.firstName || "");
                  setLastName(user.lastName || "");
                  setIsEditing(true);
                }}
              >
                Edit Name
              </button>
            </>
          ) : (
            <>
              <h1>Edit user info</h1>

              <div className="edit-wrapper">
                <div className="input-wrapper">
                  <label htmlFor="firstName"></label>
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="lastName"></label>
                  <input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="button-wrapper">
                  <button className="edit-button" onClick={handleSave}>
                    Save
                  </button>

                  <button
                    className="edit-button"
                    onClick={() => {
                      // annuler = revenir aux valeurs actuelles
                      setFirstName(user.firstName || "");
                      setLastName(user.lastName || "");
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
