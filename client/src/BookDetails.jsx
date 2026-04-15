import {useLocation} from "react-router-dom"


export default function BookDetails() {
    const { state } = useLocation()
    const id = state.id
    return <h5>details for {id}</h5>
}