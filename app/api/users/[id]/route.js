import { users} from '@/app/util/db'
import { NextResponse } from 'next/server'
import fs from 'fs'

// 2. Specific User Data
export async function GET(_, res) {
    const {id} = await res.params 
    const user = users.filter(user => user.id == id)
    return NextResponse.json({user, ok: true}, {status: 201})
}

// 3. Login
export async function POST(req, res) {
    let { name, email, password } = await req.json()
    const { id } = await res.params

    const { 
        name: uName, 
        email: uEmail, 
        password: uPassword 
    } = users.find(user => user.id == id)

    if (uName == name && uEmail == email && uPassword == password) {
        return NextResponse.json({ result: 'Successfully Logged In' }, { status: 200 })
    } else if (!name || !email || !password) {
        return NextResponse.json({ result: 'Please fill out all fields' }, { status: 401 })
    } else {
        return NextResponse.json({ result: 'Incorrect Credentials' }, { status: 401 })
    }
}

// 6. Delete User
export async function DELETE(_, res) {
    const { id } = await res.params
    const userIndex = users.findIndex(user => user.id == id)
    if (userIndex == -1) {
        return NextResponse.json({ result: 'User does not exist' }, { status: 401 })
    }
    users.splice(userIndex, 1)

    // extract just the users array from update data
    const UpdatedUsersArray = users

    // convert the udatedusersArray to Json string
    const updatedData = JSON.stringify(UpdatedUsersArray, null, 2)

    // write the updated data to the db.json file
    fs.writeFileSync(
        './app/util/db.js',
        `export const users = ${updatedData}`,
        'utf-8'
    )

    return NextResponse.json({ result: 'User successfully deleted!' }, { status: 201 })
}