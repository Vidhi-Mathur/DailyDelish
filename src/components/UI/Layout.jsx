import { useContext, useState } from 'react'
import { Menu, X, User, Settings, LogOut, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/auth-context'

const sidebarLinks = [
    {
      path: "/my-account/dashboard",
      label: "Dashboard",
      icon: <ShoppingCart className="w-5 h-5 mr-3" />,
    },
    {
      path: "/my-account/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 mr-3" />,
    },
    {
      path: "/my-account/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5 mr-3" />,
    },
];

export const Layout = ({children}) => {
    const { isAuthenticated, details, logout } = useContext(AuthContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const navigate = useNavigate();
    
    const sidebarToggler = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const logoutHandler = () => {
        navigate("/signup")
        logout()
    }

    return (
        <div className="flex h-screen bg-green-50">
            <aside className={`${ isSidebarOpen ? 'translate-x-0' : '-translate-x-full' } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-700 to-green-900 text-white transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between h-16 bg-green-800 px-6">
                    <Link to="/" className="text-2xl font-bold">DailyDelish</Link>
                    <button onClick={sidebarToggler} className="text-white focus:outline-none hover:text-green-200">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8">
                    {isAuthenticated? (
                        <>
                        {sidebarLinks.map((link, index) => (
                            <Link key={index} to={link.path} onClick={sidebarToggler} className="flex items-center px-6 py-3 mt-2 text-green-100 hover:bg-green-600 transition-colors duration-200">
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                        </>
                    ): (
                        <Link to="/signup" onClick={sidebarToggler} className="mt-2 block px-6">
                            <button className="w-full px-4 py-2 bg-white text-green-600 border border-green-700 rounded-md hover:bg-green-100 transition-colors duration-300">
                            Signup
                            </button>
                        </Link>
                    )}
                </nav>
            </aside>
            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-md">
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={sidebarToggler} className="text-white focus:outline-none hover:text-green-200 transition-colors duration-200">
                                <Menu className="w-6 h-6" />
                            </button>
                            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-green-200 transition-colors duration-200">DailyDelish</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/my-account/profile" className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded-full transition-colors duration-200">
                                <User className="w-5 h-5" />
                                <span className="text-sm font-medium">{details.name !== "" ? details.name : 'User'}</span>
                            </Link>
                            {isAuthenticated && (
                                <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded-full transition-colors duration-200" onClick={logoutHandler}>
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-100 p-6 flex items-center justify-center">{children}</main>
            </div>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" onClick={sidebarToggler} />
            )}
        </div>
    )
}