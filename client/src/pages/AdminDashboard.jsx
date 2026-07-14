import { useEffect, useState } from "react";
import AdminChart from "../components/AdminChart";
import api from "../services/api";
import Loading from "../components/Loading";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/admin/dashboard", {
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

   const cards = [
        {
            title: "Users",
            value: dashboard.totalUsers,
            icon: "👥",
            color: "primary",
        },
        {
            title: "Sellers",
            value: dashboard.totalSellers,
            icon: "🏪",
            color: "success",
        },
        {
            title: "Admins",
            value: dashboard.totalAdmins,
            icon: "🛡️",
            color: "dark",
        },
        {
            title: "Books",
            value: dashboard.totalBooks,
            icon: "📚",
            color: "warning",
        },
        {
            title: "Orders",
            value: dashboard.totalOrders,
            icon: "📦",
            color: "info",
        },
        {
            title: "Revenue",
            value: `₹${dashboard.totalRevenue}`,
            icon: "💰",
            color: "success",
        },
        {
            title: "Pending",
            value: dashboard.pendingOrders,
            icon: "⏳",
            color: "secondary",
        },
        {
            title: "Processing",
            value: dashboard.processingOrders,
            icon: "🚚",
            color: "primary",
        },
        {
            title: "Delivered",
            value: dashboard.deliveredOrders,
            icon: "✅",
            color: "success",
        },
   ];
   

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-5">
                📊 Admin Dashboard
            </h2>

            <div className="row g-4">
                {cards.map((card) => (
                    <div className="col-lg-4 col-md-6" key={card.title}>
                        <div 
                            className={`card border-0 shadow-lg bg-${card.color} text-white h-100`}
                            style={{
                                borderRadius: "18px",
                                transition: "0.3s"
                            }}
                        >
                            <div className="card-body text-center">
                                <h1 style={{fontSize: "50px"}}>
                                    {card.icon}
                                </h1>
                                <h2 className="fw-bold">
                                    {card.value}
                                </h2>
                                <h5>{card.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AdminChart dashboard={dashboard} />
        </div>
    );
}

export default AdminDashboard;