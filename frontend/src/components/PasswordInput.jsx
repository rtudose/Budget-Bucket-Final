// Password Input component to show/hide password
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ id, name, value, placeholder, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black dark:bg-gray-700 dark:text-white dark:border-gray-600'
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <button
                type="button" // Prevents form submission
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
    );
};

export default PasswordInput;
