import { useLocation } from "react-router-dom"


export default function ShowBook () {

    const location = useLocation()
    const author = location.state.author
    const title = location.state.title
    return (
        <div>
            <h3 className="text-2xl text-center text-white">New Title</h3>
            { author && title ? <h4 className="text-2xl text-white">Added: {title} by {author} </h4> : null}
        </div>

    )
}

