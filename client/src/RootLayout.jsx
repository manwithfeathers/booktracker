import Navigation from "./Navigation";
import { Outlet } from "react-router-dom"

export default function RootLayout() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    )
}