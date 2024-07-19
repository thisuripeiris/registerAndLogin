import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function Dashboard() {
    const { user } = useContext(UserContext);

    console.log('User in Dashboard:', user); // Debugging line

    return (
        <div>
            <div>Dashboard</div>
            {user && <h1>Hi {user.name}!</h1>}
        </div>
    );
}
