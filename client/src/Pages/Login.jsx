import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('http://localhost:8000/login', { email, password });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({ email: '', password: '' });
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('An error occurred during login');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={loginUser}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    );
}
