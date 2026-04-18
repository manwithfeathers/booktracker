import {useLocation} from "react-router-dom"


export default function BookDetails() {
    const { state } = useLocation()
    
    const title = state.details.title  ? state.details.title : "No title"
    const review = state.details.review ? state.details.review : "No reviews yet"
    
    
    

    return <h4>{title}:  {review}</h4>
}