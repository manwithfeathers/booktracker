import { useLocation } from "react-router-dom"


const Profile = () => {

    const location = useLocation()
    const user = location.state

    return (
        <div>
            
            { user ? <h4 className="text-2xl text-center text-white">Hi, {user}!</h4> : null}
        </div>

    )
}

export default Profile