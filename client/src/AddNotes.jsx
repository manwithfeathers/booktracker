import {useLocation} from "react-router-dom"
import { useState } from 'react'
import { useSelector } from "react-redux"
import './App.css'
import axios from "axios"
import { Navigate } from "react-router-dom"





export default function AddNotes() {
    
    const user = useSelector((state) => state.auth.user)
    const { state } = useLocation()

    if (!state) return null
    

    const book_id = state.id
   
    const [review, setReview] = useState("")
    const [reviewed, setReviewed ] = useState(null)
    const [favourite, setFavourite] = useState(false)

    // const checkForReview = async () => {
    //   const checking = await axios.post("http://localhost:8080/checkforreview", {user, book_id})
    //   console.log("check for review", checking[0])
      
    // }

    

    const submitHandler = async (e) => {
        e.preventDefault()
        

        const updated = await axios.post("http://localhost:8080/addnotes", {
            review: review,
            favourite: favourite,
            book_id: book_id,
            user: user
        })

        console.log("updated", updated)

        setReviewed(true)
        



    }

    // checkForReview()


    return (
        <>
         <div>
        <form className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-150" onSubmit={submitHandler}>
          <h3 className="pb-6 text-2xl text-center text-white">Add Notes</h3>
          
          <label className="block mb-1 text-xl text-cyan-400" htmlFor="review">Review</label>
          <textarea rows="4" cols="50" className="w-full p-1 mb-6 focus:outline-none bg-white text-black"  id="review"  value={review} onChange={(e) => setReview(e.target.value)}></textarea>
          <label className="block mb-1 text-xl text-cyan-400" htmlFor="favourite">Favourite</label>
          <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-white text-black"  id="favourite" type="checkbox" value={favourite} onChange={(e) => setFavourite(e.target.checked)}></input>
          <div className="flex justify-between">
            <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="submit">Submit</button>
            <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button">Cancel</button>
          </div>
        
            

          

        </form>
          { reviewed ? <Navigate to="/listbooks" replace={true} /> : null }
        
      </div>

        
        </>
    )
}