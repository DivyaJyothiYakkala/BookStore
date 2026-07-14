import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AdminChart({ dashboard }) {
    const data = {
        labels: ["Users", "Sellers", "Books", "Orders"],
        datasets: [
            {
                label: "Statistics",
                data: [
                    dashboard.totalUsers,
                    dashboard.totalSellers,
                    dashboard.totalBooks,
                    dashboard.totalOrders,
                ],
                backgroundColor: [
                    "#4e73df",
                    "#1cc88a",
                    "#f6c23e",
                    "#e74a3b",
                ],
                borderColor: [
                    "#4e73df",
                    "#1cc88a",
                    "#f6c23e",
                    "#e74a3b",
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="card shadow-lg border-0 p-4 mt-5">
            <h3 className="text-center mb-4">
                📈 Platform Statistics
            </h3>

            <Bar data={data} options={options}/>
        </div>
    );
}

export default AdminChart;