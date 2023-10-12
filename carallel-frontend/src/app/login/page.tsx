'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { API } from "../constant";

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event: any) => {
        const response = await fetch(API + "/api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: password
            })
        });

        if (response.ok) {
            const res = await response.json();
            localStorage.setItem("token", res.token);
            router.push('/');
            window.location.href = "/";
        } else {
            alert("Something went wrong while Login!");
        }
       
    }

    if (localStorage.getItem('token')) {
        window.location.href = "/";
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                                <input value={name} onChange={e => setName(e.target.value)} type="text" name="username" placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button onClick={onSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't you have an account? <Link href="signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}