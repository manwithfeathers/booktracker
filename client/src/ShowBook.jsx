import { useLocation } from "react-router-dom"


export default function ShowBook () {

    const location = useLocation()
    const authorFirstname = location.state.authorFirstname
    const authorSurname = location.state.authorSurname

    const title = location.state.title
    return (
        <div>
            <h3 className="text-2xl text-center text-white">New Title</h3>
            { authorSurname && title ? <h4 className="text-2xl text-white">Added: {title} by {authorFirstname} {authorSurname} </h4> : null}
        </div>

    )
}

