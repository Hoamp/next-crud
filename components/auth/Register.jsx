import axios from "axios";

const { useState } = require("react");

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            let data = {
                name,
                email,
                password,
                password_confirmation,
            };

            let result = await axios.post(`http://localhost:8000/register`, data, {});

            let response = result.data;

            console.log(response);
        } catch (error) {
            console.log(`Registrasi gagal : ${error}`);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Password confirmation" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} />
                <button>Register</button>
            </form>
        </div>
    );
};

export default Register;
