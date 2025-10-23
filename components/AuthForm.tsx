/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';


export default function AuthForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    function validate() {
        if (!identifier || !password) { setError('Semua field wajib diisi'); return false; }
        if (identifier.includes('@') && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(identifier)) { setError('Format email tidak valid'); return false; }
        return true;
    }


    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setError('');
        if (!validate()) return;
        setLoading(true);
        try {
            await axios.post('/api/login', { identifier, password });
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Login gagal');
        } finally { setLoading(false); }
    }


    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md mx-auto mt-24 px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700
             sm:px-8 sm:py-10 transition-all duration-300 ease-in-out"
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                Masuk ke Akun
            </h2>

            {error && (
                <div className="text-red-600 dark:text-red-400 mb-4 text-center font-medium bg-red-50 dark:bg-red-900/40 p-2 rounded-lg">
                    {error}
                </div>
            )}

            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Email atau Username
            </label>
            <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                placeholder="contoh@email.com atau username"
            />

            <label className="block mt-5 mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Password
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-16 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="Masukkan password"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {show ? "Hide" : "Show"}
                </button>
            </div>

            <button
                type="submit"
                className="mt-8 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
               text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="w-5 h-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Loading...
                    </span>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
}