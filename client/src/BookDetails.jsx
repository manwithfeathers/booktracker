import {useLocation} from "react-router-dom"

import './App.css'

export default function BookDetails() {
    const { state } = useLocation()
    const details = state.details

    console.log("deets", details)

    if (!details) return <p>No Details</p>

    
    

    return (<>

            <table className=" border border-gray-300 table-fixed">
                    <thead>
                        <tr>
                            <th >Title</th>
                            <th>Reviewer</th>
                            <th>Review</th>
                            <th></th>


                        </tr>
                    </thead>
                    <tbody>
                    

                    {details.map(book => (
                        <tr key={book.book_id}>
                            <td className=" border border-gray-300 font-medium text-white  pl-10 pr-10" >{book.title}</td>
                            <td className=" border border-gray-300  font-medium text-white  pl-10 pr-10" >{book.username}</td>
                            <td className=" border border-gray-300  font-medium text-white  pl-10 pr-10" >{book.review}</td>

                                                        

                            

                        </tr>
                    ))}
                    </tbody>
                </table>
            
        
        
                
               
                
            </>
            )
}