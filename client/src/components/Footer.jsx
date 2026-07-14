function Footer() {
    return (
        <footer 
            className="text-light mt-5 py-5"
            style={{
                background: "linear-gradient(135deg, #1e2936, #0f172a"
            }}
        >
            <div className="container text-center">

                <h4 className="fw-bold mb-3">📚 Book Store</h4>

                <p>
                    Your one-stop destination for discovering and buying your
                    favourite books.
                </p>

                <hr />

                <p className="mb-1">
                    📧 support@booknest.com
                </p>

                <p className="mb-1">
                    📞 +91 9876543210
                </p>

                <p>
                    📍 Hyderabad, India
                </p>
                <div className="my-3 fs-4">
                    📘 &nbsp; 📷 &nbsp; 🐦 &nbsp; 💼
                </div>

                <hr />

                <p className="mb-0">
                    © 2026 BookNest. All Rights Reserved.
                </p>

            </div>
        </footer>
    );
}

export default Footer;