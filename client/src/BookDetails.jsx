import {useLocation} from "react-router-dom"

import './App.css'

export default function BookDetails() {
    const { state } = useLocation()
    const details = state.details

    console.log("deets", details)

    if (!details) return <p>No Details</p>

    
    

    return (<>
            {details.map(book => (
                <h3>{book.title}: {book.review}</h3>
            )
                
                
               
                
            
            )}
            </>
            )
}