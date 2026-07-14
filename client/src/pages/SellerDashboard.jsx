import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";

function SellerDashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/seller/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDashboard(response.data.dashboard);
            } catch (error) {
                console.error("Error loading dashboard:", error);
            }
        };

        loadDashboard();
    }, []);

    if (!dashboard) {
        return <Loading />
    }

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-5">
                📊 Seller Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card bg-primary text-white shadow border-0 rounded-4 text-center p-4">
                        <h1>📚</h1>
                        <h5>Total Books</h5>
                        <h2 className="text-primary">{dashboard.totalBooks}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-warning shadow border-0 rounded-4 text-center p-4">
                        <h1>🛒</h1>
                        <h5>Total Orders</h5>
                        <h2>{dashboard.totalOrders}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-success text-white shadow border-0 rounded-4 text-center p-4">
                        <h1>💰</h1>
                        <h5>Total Revenue</h5>
                        <h2>₹{dashboard.totalRevenue}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-secondary text-white shadow border-0 rounded-4 text-center p-4">
                        <h1>⏳</h1>
                        <h5>Pending</h5>
                        <h2>{dashboard.pendingOrders}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-info text-white shadow border-0 rounded-4 text-center p-4">
                        <h1>⚙️</h1>
                        <h5>Processing</h5>
                        <h2>{dashboard.processingOrders}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-white shadow border-0 rounded-4 text-center p-4">
                        <h1>✅</h1>
                        <h5>Delivered</h5>
                        <h2>{dashboard.deliveredOrders}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SellerDashboard;