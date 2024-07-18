import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const response = await axios.post('/register', { name, email, password });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({ name: '', email: '', password: '' });
                toast.success('Registration Successful. Welcome!');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error('Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name..."
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email..."
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password..."
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
}
