import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks"

export const Navbar = () => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  return (
    <nav className="col-span-full flex items-center justify-between py-4 border-b px-24">
      <h1 className="font-bold text-[3rem]">
        <Link to='/'>Sage</Link>
      </h1>
      <div className="flex justify-end gap-x-12 items-center">

        {isLoggedIn ? <button
          onClick={async () => {
            console.log('log out the user')
            await axios.get('/api/v1/auth/logout')
            window.location.reload(true)
          }}
          className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
          Logout
        </button>
          : location.pathname === '/auth/login' ? <Link
            to='/auth/register'
            className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
            Register
          </Link> : <Link
            to='/auth/login'
            className="px-4 py-2 border rounded-md font-medium text-[1.4rem]">
            Login
          </Link>}
      </div>
    </nav>
  )
}
