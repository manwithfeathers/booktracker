const express = require('express');
const app = express();
const cors = require("cors")
const mysql = require("mysql2/promise")
const bcrypt = require("bcrypt")
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

const saltRounds = 10;


app.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword])
        res.send({username: username})
    } catch (err) {
        res.status(418).send("Sign up failed: " + err.message)
    }
})

app.post("/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username])
        if (rows.length < 1) {
            res.status(418).send("Username doesn't match")
        } else {
            const match = await bcrypt.compare(password, rows[0].password)
            if (match) {
                res.send({username})
            } else {
                res.status(418).send("Password doesn't match")
            }
        }
    } catch (err) {
        res.status(418).send(err.message)
    }
})

app.post("/addbook", async (req, res) => {
    const title = req.body.title
    const authorFirstname = req.body.authorFirstname
    const authorSurname = req.body.authorSurname
    const user = req.body.user
    const review = req.body.review
    const favourite = req.body.favourite

    try {

    const rawUser_id = await db.query("SELECT user_id FROM users WHERE username = ?", [user])
    const user_id = rawUser_id[0][0].user_id
   

        
    const addedBook = await db.query("INSERT INTO books (title, author_firstname, author_surname, added_by) VALUES (?, ?, ?, ?)", [title, authorFirstname, authorSurname, user_id])
    const book_id = addedBook[0].insertId
    console.log(user_id, book_id, review, favourite)
    await db.query("INSERT INTO book_review (reviewer_id, book_id, review, favourite) VALUES (?, ?, ?, ?)", [user_id, book_id, review, favourite])
        
         
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

app.get("/bookdetails", async (req, res) => {
    const book_id = req.query.id
    try {
    const bookDetails = await db.query("SELECT b.title, r.review, u.username FROM books AS b LEFT JOIN book_review AS r ON b.book_id = r.book_id LEFT JOIN users AS u ON r.reviewer_id = u.user_id WHERE b.book_id = ?", [book_id])

    res.send(bookDetails)
    } catch(err) {
        res.send(err)
    }
})


app.post("/checkforreview", async (req, res) => {
    const book_id = req.body.book_id
    const user = req.body.user
    const rawUser_id = await db.query("SELECT user_id FROM users WHERE username = ?", [user])
    const user_id = rawUser_id[0][0].user_id

    const checkForReview = await db.query("SELECT review FROM book_review WHERE reviewer_id = ? AND book_id = ?", [user_id, book_id])
    console.log("checking", checkForReview)
})


app.post("/addnotes", async (req, res) => {
   
    const user = req.body.user
    const review = req.body.review
   
    const favourite = req.body.favourite
   
    const book_id = req.body.book_id
   
    const rawUser_id = await db.query("SELECT user_id FROM users WHERE username = ?", [user])
    const user_id = rawUser_id[0][0].user_id

   
  


    const updated = await db.query("INSERT INTO book_review (reviewer_id, book_id, review, favourite) VALUES (?, ?, ?, ?)", [user_id, book_id, review, favourite])
   
   
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