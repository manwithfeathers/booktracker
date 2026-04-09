import './App.css'
import axios from "axios"
import {useState, useEffect} from "react"

export default function ListBooks() {
    const [books, setBooks] = useState([])


    useEffect(() => {
        
        axios.get("http://localhost:8080/listbooks").then((res) => {
        const rawBooks = res.data[0]
        rawBooks.sort((a,b) => a.author.localeCompare(b.author))
        setBooks(rawBooks)
    })

    }, [])

    

    return (
        <>
            

            {books.map((book) => (
                <h4 className=" font-medium text-white text-left pl-10" key={book.id}>{book.title} by {book.author}</h4>
                
            ))}
        </>
    )
    
}