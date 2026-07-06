import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFromData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const handleChange = (e) => {
        setFromData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register",formData);

            alert(response.data.message);

            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };
    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center- mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
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

                        <div className="mb-3">
                            <label className="form-label">Register As</label>

                            <select
                                className="form-select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        <button className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;