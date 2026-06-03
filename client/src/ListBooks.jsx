import './App.css'
import axios from "axios"
import {useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export default function ListBooks() {
    const [books, setBooks] = useState([])
    const [view, setView] = useState("all")
    const user = useSelector((state) => state.auth.user)
    const  navigate = useNavigate()
    

    const showMyBooks = async () => {
            
            await axios.get("http://localhost:8080/showmybooks", {params:{user: user}}).then((res) => {
            console.log(res.data)
            const rawBooks = res.data[0]
        
            rawBooks.sort((a,b) => a.author_surname.localeCompare(b.author_surname))
            setBooks(rawBooks)

            })
       
    }

    const showBooks = async () => {
        await axios.get("http://localhost:8080/listbooks").then((res) => {
        const rawBooks = res.data[0]
       
        rawBooks.sort((a,b) => a.author_surname.localeCompare(b.author_surname))
        setBooks(rawBooks)
        })
    }

    const deleteBook = async (id) => {

        try {
        console.log("trying to delete")

        const res = await axios.delete("http://localhost:8080/deletebook", {
            data: {id},
        })
        showBooks()
    } catch (err){
        console.log(err.response?.data?.message)
        toast.error(err.response?.data?.message || "fuck! not working mate!")
        }
       
    }   

    const bookDetails = async (id) => {

        let rawDetails = await axios.get("http://localhost:8080/bookdetails", {params: {id}})
        let details = rawDetails.data[0]
     
       navigate("/bookdetails", {state: {details}})

    }

    const addNotes = async (id) => {

       
        navigate("/addnotes", {state: {id}})

    }
    
    

    useEffect(() => {

        showBooks()
        
    }, [])

    

    return (
       <div className="mx-auto w-full max-w-5xl mt-16 px-6">
            { user && 
           <div className="flex mb-4 rounded overflow-hidden border border-cyan-400 w-fit">
                <button className={`px-4 py-1.5 text-sm transition-colors ${view === "all" ? "bg-cyan-400 text-black" : "text-cyan-400 hover:bg-cyan-400/20"}`} onClick={() => { setView("all"); showBooks(); }}>All books</button>
                <button className={`px-4 py-1.5 text-sm transition-colors ${view === "mine" ? "bg-cyan-400 text-black" : "text-cyan-400 hover:bg-cyan-400/20"}`} onClick={() => { setView("mine"); showMyBooks(); }}>My books</button>
            </div>
            }
            
             <div>
                <table className="w-full border-collapse">
                    <thead className="bg-cyan-400 text-black">
                        <tr>
                            <th className="px-4 py-2 text-left" >Author</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    

                    {books.map((book) => (
                        <tr key={book.book_id}>
                            <td className=" border border-gray-300 font-medium text-white  pl-10 pr-10" >{book.author_surname}, {book.author_firstname} </td>
                            <td className=" border border-gray-300  font-medium text-white  pl-10 pr-10" >{book.title}</td>

                            <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 border-b bg-cyan-400 rounded-sm text-black border-gray-700 hover:bg-gray-800 transition-colors" type="button" onClick={() => deleteBook(book.book_id)}> delete </button></td>
                            <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 border-b bg-cyan-400 rounded-sm text-black border-gray-700 hover:bg-gray-800 transition-colors"  type="button" onClick={() => bookDetails(book.book_id)}> notes </button></td>
                            <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 border-b bg-cyan-400 rounded-sm text-black border-gray-700 hover:bg-gray-800 transition-colors" type="button" onClick={() => addNotes(book.book_id)}> edit notes </button></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
               
            </div>
        </div>
    )
    
}