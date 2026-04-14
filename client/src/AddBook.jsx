import { useState } from 'react'
import { useSelector } from "react-redux"

import './App.css'
import axios from "axios"
import { Navigate } from "react-router-dom"

export default function AddBook() {

    const [ title, setTitle ] = useState("")
    const [ authorFirstname, setAuthorFirstname ] = useState("")
    const [ authorSurname, setAuthorSurname ] = useState("")

    const [book, setBook] = useState(null)

    const user = useSelector((state) => state.auth.user)
    const loggedIn = useSelector((state) => state.auth.isLoggedIn)

  

  

  const submitHandler = (e) => {
    e.preventDefault()
    setBook(title)
   
    axios.post("http://localhost:8080/addbook", {
        title: title, 
        authorFirstname: authorFirstname,
        authorSurname: authorSurname,
        user: user,
    }).then((data) => {
      
      setTitle("")
      setAuthorFirstname("")
      setAuthorSurname("")
     
    })
  }

  return (
    <>
      <div>
        <form className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-110" onSubmit={submitHandler}>
          <h3 className="pb-6 text-2xl text-center text-white">Add Book</h3>
          <label className="block mb-1 text-xl text-cyan-400" htmlFor="title">Title</label>
          <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-white text-black" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <label className="block mb-1 text-xl text-cyan-400" htmlFor="authorFirstname">Author Firstname</label>
          <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-white text-black"  id="authorFirstname" type="text" value={authorFirstname} onChange={(e) => setAuthorFirstname(e.target.value)}></input>
          <label className="block mb-1 text-xl text-cyan-400" htmlFor="authorSurname">Author Surname</label>
          <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-white text-black"  id="authorSurname" type="text" value={authorSurname} onChange={(e) => setAuthorSurname(e.target.value)}></input>
          <div className="flex justify-between">
            <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="submit">Submit</button>
            <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button">Cancel</button>
          </div>
        
            { book ? <Navigate to="/showbook" replace={true} state={{authorFirstname, authorSurname, title, user}} /> : null }

          

        </form>
        
      </div>
    </>
  )
}


