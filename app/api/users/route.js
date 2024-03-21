import { users } from '@/app/util/db'
import { NextResponse } from 'next/server';
import fs from 'fs';

// 1. All Users Data
export function GET() {
    const data = users;
    return NextResponse.json({ data }, { status: 200 });
}

// 2. Create User and Add in local Db file
export async function POST(req, res) {
    let { id, name, age, email, password } = await req.json();

    // check if data is provided
    if (!id || !name || !age || !email || !password) {
        return NextResponse.json({ result: 'Please fill out all fields' }, { status: 401 })
    }
    else {
        // add the new user to in-memory array
        users.push({ id, name, email, password });

        // extract just the users array from update data
        const UpdatedUsersArray = users;

        // convert the udatedusersArray to Json string
        const updatedData = JSON.stringify(UpdatedUsersArray, null, 2);

        // write the updated data to the db.json file
        fs.writeFileSync(
            './app/util/db.js',
            `export const users = ${updatedData}`,
            'utf-8'
        );

        return NextResponse.json({ result: 'User successfully added!' }, { status: 201 })
    }
}

// 5. Update User
export async function PUT(req, res) {
    let { id, name, email, password } = await req.json();

    // Find the user in the users array
    const userIndex = users.findIndex(u => u.id == id);

    // check if user exists
    if (userIndex == -1) {
        return NextResponse.json({ result: 'User does not exist' }, { status: 401 })
    }
    // update the user data
    if (name) { users[userIndex].name = name; }
    if (email) { users[userIndex].email = email; }
    if (password) { users[userIndex].password = password; }

    // extract just the users array from the updated data
    const UpdatedUsersArray = users

    const updatedData = JSON.stringify(UpdatedUsersArray, null, 2)

    fs.writeFileSync(
        './app/util/db.js',
        `export const users = ${updatedData}`,
        'utf-8'
    );

    return NextResponse.json(
        { result: 'User successfully updated!' },
        { status: 201 })

}

