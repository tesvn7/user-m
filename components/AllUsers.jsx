'use client'

import { useEffect, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";

const AllUsers = () => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const usersInfo = await response.json();
            setUsers(usersInfo.data);
        }
        fetchUsers()
    }, [])
    return (
        <div>
            {
                users && users.map((user) => (
                    <Card key={user.id}>
                        <List>
                            <ListItem>{user.name}</ListItem>
                        </List>
                    </Card>
                ))
            }
        </div>
    );
};

export default AllUsers;