import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from "axios"


function App() {

  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const submitHandler = (e) => {
    e.preventDefault()
   
    axios.post("http://localhost:8080/signup", {username: username, password: password}).then((data) => {
      console.log(data)
      setUsername("")
      setPassword("")
    })
  }

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <h3>Sign Up</h3>
          <label htmlFor="username">user name</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <label htmlFor="password">password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <div>
            <button type="submit">submit</button>
          </div>

          

        </form>
        
      </div>
    </>
  )
}

export default App
