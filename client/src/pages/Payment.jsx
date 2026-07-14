import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [form, setForm] = useState({
        name: "",
        card: "",
        expiry: "",
        cvv: "",
        upi: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handlePayment = async () => {
        // Validation for Card Payment
        if (
            paymentMethod === "Card" &&
            (!form.name || !form.card || !form.expiry || !form.cvv)
        ) {
            alert("Please fill all card details.");
            return;
        }

        // Validation for UPI
        if (paymentMethod === "UPI" && !form.upi) {
            alert("Please enter your UPI ID.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const api = (await import("../services/api")).default;

            const response = await api.post(
                "/orders",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                `${response.data.message}\nPayment Method: ${paymentMethod}`
            );

            localStorage.removeItem("cart");

            navigate("/orders");
        } catch {
            alert("Payment failed");
        }
    };

    return (
        <div className="container py-5">
            <div
                className="card shadow-lg p-4 mx-auto"
                style={{ maxWidth: "500px" }}
            >
                <h2 className="text-center mb-4">
                    💳 Payment
                </h2>

                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Select Payment Method
                    </label>

                    <select
                        className="form-select"
                        value={paymentMethod}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    >
                        <option value="COD">
                            Cash on Delivery
                        </option>

                        <option value="Card">
                            Credit / Debit Card
                        </option>

                        <option value="UPI">
                            UPI
                        </option>
                    </select>
                </div>

                {paymentMethod === "Card" && (
                    <>
                        <input
                            className="form-control mb-3"
                            placeholder="Card Holder Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Card Number"
                            name="card"
                            value={form.card}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Expiry (MM/YY)"
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-4"
                            placeholder="CVV"
                            name="cvv"
                            value={form.cvv}
                            onChange={handleChange}
                        />
                    </>
                )}

                {paymentMethod === "UPI" && (
                    <input
                        className="form-control mb-4"
                        placeholder="Enter UPI ID"
                        name="upi"
                        value={form.upi}
                        onChange={handleChange}
                    />
                )}

                {paymentMethod === "COD" && (
                    <div className="alert alert-info">
                        💵 You have selected <strong>Cash on Delivery</strong>.
                        Payment will be collected when your order is delivered.
                    </div>
                )}

                <button
                    className="btn btn-success w-100"
                    onClick={handlePayment}
                >
                    {paymentMethod === "COD"
                        ? "Place Order"
                        : "Pay Now"}
                </button>
            </div>
        </div>
    );
}

export default Payment;