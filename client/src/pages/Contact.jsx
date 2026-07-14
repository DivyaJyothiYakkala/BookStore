import { useState } from "react";

function Contact() {

    const [form, setForm] = useState({
        name:"",
        email:"",
        message:""
    });

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Message sent successfully!");
        setForm({
            name:"",
            email:"",
            message:""
        });
    };

    return(
        <div className="container py-5">

            <div className="card shadow-lg border-0 p-5">

                <h1 className="text-center mb-4">
                    📞 Contact Us
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        rows="5"
                        placeholder="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary w-100">
                        Send Message
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Contact;