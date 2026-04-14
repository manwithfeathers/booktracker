const express = require('express');
const app = express();
const cors = require("cors")
const mysql = require("mysql2/promise")
const bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'database',
  database        : 'BookTracker',
  queueLimit      : 0,
  waitForConnections: true,

});


app.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        
        const logged = await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password])
        res.send({username: username})
         
    } catch (err) {
        console.log(err)
    }

})

app.post("/addbook", async (req, res) => {
    const title = req.body.title
    const authorFirstname = req.body.authorFirstname
    const authorSurname = req.body.authorSurname
    const user = req.body.user

    try {

        
        const logged = await db.query("INSERT INTO books (title, author_firstname, author_surname, added_by) VALUES (?, ?, ?, ?)", [title, authorFirstname, authorSurname, user])
        
         
    } catch (err) {
        console.log(err)
    }

})

app.get("/listbooks", async (req, res) => {
    // const title = req.body.title
    // const author = req.body.author
    try {

        
        const books = await db.query("SELECT * FROM books")
        res.send(books)
        
         
    } catch (err) {
        console.log(err)
    }

})

app.get("/showmybooks", async (req, res) => {
    
    const user = req.query.user
    
    // const author = req.body.author
    try {

        
        const books = await db.query("SELECT * FROM books WHERE added_by = ?", [user])
        res.send(books)
        
         
    } catch (err) {
        console.log(err)
    }

})

app.delete("/deletebook", async(req, res) => {
    
    const id = req.body.id
    try {
        await db.query("DELETE FROM books WHERE book_id = ?" , [id])
        res.send({ success: true }) 
    } catch(err) {
        console.log(err)
    }
})



app.listen(8080, () => {
    console.log("listening on port 8080")
})