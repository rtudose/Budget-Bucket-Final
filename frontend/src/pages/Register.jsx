// Register page, used by the user to create a new account
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../features/auth/authStore';
import Spinner from '../components/Spinner';
import PasswordInput from '../components/PasswordInput';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { username, email, password, confirmPassword } = formData;
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isError = useAuthStore((state) => state.isError);
    const isSuccess = useAuthStore((state) => state.isSuccess);
    const message = useAuthStore((state) => state.message);
    const reset = useAuthStore((state) => state.reset);

    console.log("Register Rendered. Triggering Redirect?", {
        HasUser: !!user,
        IsSuccess: isSuccess
    });

    // The 'Watcher', which looks for changes in the state and updates the UI accordingly
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || (user && !isLoading)) {
            toast.success('Registration successful! Welcome to Budget Bucket.');
            navigate('/');
        }

        return () => {
            if (isSuccess) reset();
        }
    }, [user, isError, isSuccess, message, navigate, reset]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Frontend validation (simple) to don't send empty (or incorrect) Sdata to the backend
    const onSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !username) {
            toast.error('Please fill in all fields');
        } else if (username.length < 3) {
            toast.error('Username must be at least 3 characters long');
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            toast.error('Please enter a valid email address');
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                username,
                email,
                password,
            };
            register(userData);
        }
    };

    const inputClass = "w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-colors";

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <section className='heading text-center mb-10'>
                <h1 className='text-4xl font-bold mb-4 flex justify-center items-center gap-2'>
                    <FaUser /> Register
                </h1>
                <p className='text-xl text-gray-600'>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit} noValidate>
                    <div className='mb-4'>
                        <input
                            type='text'
                            className={inputClass}
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Enter your name'
                            onChange={onChange}
                        />
                    </div>
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
                    <div className='mb-4'>
                        <PasswordInput
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm password'
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

const { user } = useAuthStore.getState();

export default Register;
