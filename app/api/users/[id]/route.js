import { users} from '@/app/util/db'
import { NextResponse } from 'next/server'

// 2. Specific User Data
export async function GET(_, res) {
    const {id} = await res.params 
    const user = users.filter(user => user.id == id)
    return NextResponse.json({user}, {status: 201})
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