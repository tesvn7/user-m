'use client'

import { useState } from "react";
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";

const SpecificUser = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null);
    
    const fetchUserData = async() => {
        const response = await fetch(`/api/users/${userId}`);
    }

    return (
        <div className=' text-[30px] mx-16 my-10 underline'>
            SpecificUser
        </div>
    );
};

export default SpecificUser;