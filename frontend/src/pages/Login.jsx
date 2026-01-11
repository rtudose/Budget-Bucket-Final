// Login page, used by the user to log into the app
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import useAuthStore from '../features/auth/authStore';
import Spinner from '../components/Spinner';
import PasswordInput from '../components/PasswordInput';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    // Get user and login actions
    const user = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isError = useAuthStore((state) => state.isError);
    const isSuccess = useAuthStore((state) => state.isSuccess);
    const message = useAuthStore((state) => state.message);
    const reset = useAuthStore((state) => state.reset);

    // The 'Watcher', which looks for changes in the state and updates the UI accordingly
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            toast.success('Login successful!', {
                toastId: 'login_success_toast'
            });
            navigate('/');
        }

        return () => {
            reset();
        }
    }, [user, isError, isSuccess, message, navigate, reset]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();


        if (!email || !password) {
            toast.error('Please fill in all fields');
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            toast.error('Please enter a valid email address');
        } else {
            const userData = {
                email,
                password,
            };

            login(userData);
        };
    };

    const inputClass = "w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-colors";

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='max-w-md mx-auto mt-10'>
            <section className='heading text-center mb-10'>
                <h1 className='text-4xl font-bold mb-4 flex justify-center items-center gap-2'>
                    <FaSignInAlt /> Login
                </h1>
                <p className='text-xl text-gray-600'>Login to manage your budget</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit} noValidate>
                    <div className='mb-4'>
                        <input
                            type='email'
                            className={inputClass}
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='mb-4'>
                        <PasswordInput
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-bold'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;