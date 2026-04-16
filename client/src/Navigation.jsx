import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {logout} from "./store/authSlice"

export default function Navigation() {
    const loggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    return (
        <nav className="flex items-center justify-between w-full h-16 py-2 text-white border-b px-28 mb-36 border-cyan-400">
            <Link to="/" className="text-2xl font-medium text-white">
                <span className="text-cyan-400">B</span>ook 
                <span className="text-cyan-400">T</span>racker
        
            </Link>
            <ul className="flex items-center h-16 text-xl">
                <li className="pl-20">
                    <Link to="/listbooks">Books</Link>
                </li>
            {!loggedIn ? 
            <>
                
                
                <li className="pl-20">
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li className="pl-20">
                    <Link to="/signin">Sign In</Link>
                </li>
           </>
            :

           <>
                 <li className="pl-20">
                    <Link to="/addbook">Add Book</Link>
                </li>
                <li className="pl-20">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="pl-20">
                    <Link to="/" onClick={()=> dispatch(logout())}>Logout</Link>
                </li>
                <li className="pl-20">
                    <Link to="/profile">Hello, {user} </Link>
                </li>

            </>
           
            }
             </ul>
        </nav>
    )
}