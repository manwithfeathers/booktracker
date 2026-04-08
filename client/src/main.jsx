import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import RootLayout from './RootLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<App/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

    </Route>
    
    )
  ))

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
