import { useSelector } from "react-redux"


const Profile = () => {

    const user = useSelector((state) => state.auth.user)

    return (
        <div>
            
            { user ? <h4 className="text-2xl text-center text-white">Hi, {user}!</h4> : null}
        </div>

    )
}

export default Profile