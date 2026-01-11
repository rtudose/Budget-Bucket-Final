// Header (navigation bar) used to show the user the state of the application
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import useAuthStore from '../features/auth/authStore';
import useDarkMode from '../hooks/useDarkMode';

const Header = () => {
    const navigate = useNavigate();

    // Get user state and functions from auth store
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    // Get theme state and function from dark mode hook
    const [colorTheme, setTheme] = useDarkMode();
    const toggleTheme = () => {
        setTheme(colorTheme);
    }

    // Handle logout (logout and navigate to login)
    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className='flex justify-between items-center py-5 border-b border-gray-200 dark:border-gray-700 mb-10'>
            <div className='logo'>
                <Link to='/' className='text-2xl font-bold text-gray-700 dark:text-white'>
                    Budget Bucket
                </Link>
            </div>
            <ul className='flex items-center gap-5'>

                <li>
                    <button onClick={toggleTheme} className="text-xl text-gray-700 dark:text-gray-200">
                        {colorTheme === 'light' ? <FaSun /> : <FaMoon />}
                    </button>
                </li>

                {/* If user is logged in, show logout button */}
                {user ? (
                    <li>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-medium">Hello, {user.username}</span>
                            <button
                                className='flex items-center gap-2 btn bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white'
                                onClick={onLogout}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </li>
                ) : (
                    <>
                        {/* If user is not logged in, show login and register buttons */}
                        <li>
                            <Link to='/login' className='flex items-center gap-2 hover:text-gray-500 dark:hover:text-white'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='flex items-center gap-2 hover:text-gray-500 dark:hover:text-white'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;