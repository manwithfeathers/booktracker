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
        <>
            

            {books.map((book) => (
                <div key={book.book_id}>
                    <h4 className=" font-medium text-white text-left pl-10" >{book.title} by {book.author_firstname} {book.author_surname}</h4>
                    
                    <button type="button" onClick={() => deleteBook(book.book_id)}> delete </button>
                </div>
            ))}
        </>
    )
    
}