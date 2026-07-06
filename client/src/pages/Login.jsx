import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", formData);

            const { token, user } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            alert("Login Successful");

            if(user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "seller") {
                navigate("/seller/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };
    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow">
                <div className="card-body">

                    <h2 className="text-center mb-4">Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn bth-primary w-100">
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;