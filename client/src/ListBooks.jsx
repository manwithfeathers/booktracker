import './App.css'
import axios from "axios"
import {useState, useEffect, useLocation } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




export default function ListBooks() {
    const [books, setBooks] = useState([])
    const user = useSelector((state) => state.auth.user)
    const  navigate = useNavigate()
    

    const showMyBooks = async () => {

        if (user) { 
            
            await axios.get("http://localhost:8080/showmybooks", {params:{user: user}}).then((res) => {
            console.log(res.data)
            const rawBooks = res.data[0]
        
       
            rawBooks.sort((a,b) => a.author_surname.localeCompare(b.author_surname))
            setBooks(rawBooks)

            })
        } else {
            alert("no user")
        }
    }

    const showBooks = async () => {
        await axios.get("http://localhost:8080/listbooks").then((res) => {
        const rawBooks = res.data[0]
       
        rawBooks.sort((a,b) => a.author_surname.localeCompare(b.author_surname))
        setBooks(rawBooks)
        })
    }

    const deleteBook = async (id) => {
        console.log("id", id)
        await axios.delete("http://localhost:8080/deletebook", {
            data: {id},
        })
        showBooks()
    }   

    const bookDetails = async (id) => {
     
    
       navigate("/bookdetails", {state: {id}})

    }
    
    

    useEffect(() => {

        showBooks()
        
    }, [])

    

    return (
        <div className="flex flex-col justify-center mt-10">
            { user && <div>
                <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button" onClick={showBooks}>show all</button>
                <button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button" onClick={showMyBooks}>my books</button>

            </div>}
            
             <div className="flex justify-center overflow-y-auto max-h-96 w-[600px]">
                <table className=" border border-gray-300 table-fixed">
                    <thead>
                        <tr>
                            <th >Author</th>
                            <th>Title</th>
                            <th></th>
                            <th></th>


                        </tr>
                    </thead>
                    <tbody>
                    

                    {books.map((book) => (
                        <tr key={book.book_id}>
                            <td className=" border border-gray-300 font-medium text-white  pl-10 pr-10" >{book.author_surname}, {book.author_firstname} </td>
                            <td className=" border border-gray-300  font-medium text-white  pl-10 pr-10" >{book.title}</td>

                            <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button" onClick={() => deleteBook(book.book_id)}> delete </button></td>
                            <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button" onClick={() => bookDetails(book.book_id)}> details </button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
    
}