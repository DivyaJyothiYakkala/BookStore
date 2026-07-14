import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/orders",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Payment Successful using ${paymentMethod}`);
            navigate("/orders");
        } catch (error) {
            alert(error.response?.data?.message || "Payment Failed");
        }
    };

    return (
        <div className="container py-5">

            <div className="card shadow-lg border-0 p-5">

                <h2 className="text-center mb-4">
                    💳 Checkout
                </h2>

                <h5>Select Payment Method</h5>

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                    />
                    <label className="form-check-label">
                        Cash on Delivery
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "UPI"}
                        onChange={() => setPaymentMethod("UPI")}
                    />
                    <label className="form-check-label">
                        UPI
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "Card"}
                        onChange={() => setPaymentMethod("Card")}
                    />
                    <label className="form-check-label">
                        Credit / Debit Card
                    </label>
                </div>

                <button
                    className="btn btn-success btn-lg mt-4"
                    onClick={handlePayment}
                >
                    Pay Now
                </button>

            </div>

        </div>
    );
}

export default Checkout;