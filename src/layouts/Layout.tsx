import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackgroundVanta from '../components/BackgroundVanta'

export default function Layout() {
    return (
        <div className="relative min-h-screen">
            <BackgroundVanta/>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
