import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [passwordShowed, setPasswordShowed] = useState('false')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
        setUsernameError(value ? '' : 'Tên đăng nhập không được để trống.')
        setLoginError('')
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setPasswordError(value ? '' : 'Mật khẩu không được để trống.')
        setLoginError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let valid = true

        if (!username) {
            setUsernameError('Tên đăng nhập không được để trống.')
            valid = false
        } else {
            setUsernameError('')
        }

        if (!password) {
            setPasswordError('Mật khẩu không được để trống.')
            valid = false
        } else {
            setPasswordError('')
        }

        if (username && password && !(username === 'admin' && password === '1')) {
            setLoginError('Tên đăng nhập hoặc mật khẩu không đúng.')
            valid = false
        } else {
            setLoginError('')
        }

        if (valid) {
            navigate('/admin')
        }
    }

    const location = useLocation();

    useEffect(() => {
        let shown = false
        if (location.state?.message) {
            toast.success(location.state.message, { theme: "colored" })
            shown = true
        }
        if (!shown) {
            const msg = sessionStorage.getItem('registerSuccess')
            if (msg) {
                toast.success(msg, { theme: "colored" })
                sessionStorage.removeItem('registerSuccess')
            }
        }
    }, [location])

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#192F59]">
            <div className="bg-white rounded-md border border-blue-300 p-8 w-full max-w-md shadow">
                <h1 className="text-3xl font-bold text-black mb-2">Đăng nhập</h1>
                <p className="text-gray-600 text-sm mb-6">
                    Bạn chưa có tài khoản?{" "}
                    <a href="/dang-ky" className="text-[#192F59] font-medium hover:underline">
                        Đăng ký tại đây
                    </a>
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        {loginError && (
                            <div className="border border-red-700 rounded text-red-700 text-sm px-3 py-2 mb-3">
                                {loginError}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            className={`w-full rounded-full px-4 py-3 border outline-none focus:ring-1 ${usernameError
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-black'
                                }`}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameError && (
                            <div className="text-red-500 text-xs mt-1">{usernameError}</div>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={passwordShowed === 'true' ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                className={`w-full rounded-full px-4 py-3 border outline-none focus:ring-1 pr-12 ${passwordError
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-black'
                                    }`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                tabIndex={-1}
                                onClick={() => setPasswordShowed(passwordShowed === 'true' ? 'false' : 'true')}
                            >
                                {passwordShowed === 'true' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g fill="currentColor">
                                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                            <path d="M3.05 9.31a1 1 0 1 1 1.914-.577c2.086 6.986 11.982 6.987 14.07.004a1 1 0 1 1 1.918.57a9.5 9.5 0 0 1-1.813 3.417L20.414 14A1 1 0 0 1 19 15.414l-1.311-1.311a9.1 9.1 0 0 1-2.32 1.269l.357 1.335a1 1 0 1 1-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 1 1-1.931-.518l.357-1.335a9.1 9.1 0 0 1-2.32-1.27l-1.31 1.312A1 1 0 0 1 3.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414Z" />
                                        </g>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {passwordError && (
                            <div className="text-red-500 text-xs mt-1">{passwordError}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-[#192F59] text-white font-semibold py-3 hover:bg-[#FFCC00] hover:text-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ĐĂNG NHẬP
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 hover:underline cursor-pointer">
                    Bạn quên mật khẩu?
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={2500} newestOnTop />
        </div>
    )
}

export default Login