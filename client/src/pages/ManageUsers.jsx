import { useEffect, useState } from "react";
import api from "../services/api";

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    const loadUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    loadUsers();
}, []);

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("User deleted successfully.");

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
            );
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to delete user");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Manage Users</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>

                                <td>
                                    {user.role !== "admin" ? (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteUser(user._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    ) : (
                                        <span className="text-muted">
                                            Protected
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;