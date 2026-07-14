import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        loadCart();
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <h2 className="text-center">Your Cart is Empty</h2>
            </div>
        );
    }

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
    );

    const updateQuantity = async (cartItemId, quantity) => {
        if (quantity < 1) return;

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/cart/${cartItemId}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartItems((prevItems) => 
                prevItems.map((item) =>
                    item._id === cartItemId
                      ? { ...item, quantity}
                      : item
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert(error.response?.data?.message || "Failed to update quantity");
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.delete(`/cart/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);

            setCartItems((prevItems) =>
                prevItems.filter((item) => item._id !== cartItemId)
            );
        } catch (error) {
            console.error("Error removing item:", error);
            alert(error.response?.data?.message || "Failed to remove item")
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">My Cart</h2>

            {cartItems.map((item) => (
                <div key={item._id} className="card mb-3 shadow-sm">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img 
                                src={`http://localhost:5000${item.book.image}`}
                                alt={item.book.title}
                                className="img-fluid rounded-start"
                                style={{ height: "220px", objectFit: "cover", width: "100%" }}
                            />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <h4>{item.book.title}</h4>

                                <p className="text-muted">
                                    {item.book.author}
                                </p>

                                <h5>₹{item.book.price}</h5>

                                <div className="d-flex align-items-center mb-3">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="mx-3 fw-bold">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p>
                                    Subtotal: ₹{item.book.price * item.quantity}
                                </p>

                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => removeItem(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <h3 className="text-end">
                Total: ₹{totalAmount}
            </h3>

            <div className="text-end">
                <button 
                    className="btn btn-success"
                    onClick={() => navigate("/payment")}
                >
                    Place order
                </button>
            </div>
        </div>
    );
    
}

export default Cart;