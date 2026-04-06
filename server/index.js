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
        console.log(logged)
         
    } catch (err) {
        console.log(err)
    }

})

app.listen(8080, () => {
    console.log("listening on port 8080")
})