import './App.css'
import axios from "axios"
import {useState, useEffect} from "react"

export default function ListBooks() {
    const [books, setBooks] = useState([])

    const showBooks = () => {
        axios.get("http://localhost:8080/listbooks").then((res) => {
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
    
    

    useEffect(() => {

        showBooks()
        
    

    }, [])

    

    return (
        <div className="flex justify-center mt-10">
            <table className=" border border-gray-300 table-fixed">
                <thead>
                    <tr>
                        <th >Author</th>
                        <th>Title</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                

                {books.map((book) => (
                    <tr key={book.book_id}>
                        <td className=" border border-gray-300 font-medium text-white  pl-10 pr-10" >{book.author_surname}, {book.author_firstname} </td>
                        <td className=" border border-gray-300  font-medium text-white  pl-10 pr-10" >{book.title}</td>

                        
                        <td className=" px-2 py-2 border border-gray-300 "><button className="px-3 py-1 rounded-sm bg-cyan-400 text-black" type="button" onClick={() => deleteBook(book.book_id)}> delete </button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
    
}