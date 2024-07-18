import React from 'react'
import axios from 'axios'


export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = (e) => {
        e.preventDefault();
        axios.get('/')
    }

    return (
        <div>
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
    )
}
