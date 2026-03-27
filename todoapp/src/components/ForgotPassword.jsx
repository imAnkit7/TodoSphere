import { useState } from "react";
import './todo.css'
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleReset = async () => {

        const update = await fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        if (update.ok) {
            alert("Password Updated")
        } else {
            alert("No account found with this emailid! ")
        }

    }

    return (
        <div className="Logincontainer">
            <div className="LoginCard">
                <h2>Reset Password</h2>

                <div className="inSideCard my-3">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input className="my-2"
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="publicBtn my-2" onClick={handleReset}>
                        Reset Password
                    </button>
                </div>

                <p style={{ color: '#a609d2', cursor: 'pointer' }} onClick={() => navigate("/")}>Login</p>
            </div>
        </div>
    )
}

export default ForgotPassword;