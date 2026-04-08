import { useLocation } from "react-router-dom"


const Profile = () => {

    const location = useLocation()
    const user = location.state

    return (
        <div>
            <h3>Profile</h3>
            { user ? <h4>hi, {user}!</h4> : null}
        </div>

    )
}

export default Profile