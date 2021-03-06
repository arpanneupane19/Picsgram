import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function Home() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true);
        }
    }, []);



    const signUp = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: password,
        };


        const response = await axios.post("/api/register", { user })
        console.log(response)
        if (response.data.success === true && response.data.statusCode === 200) {
            setRedirectToLogin(true);
        }
        if (response.data.success === false && response.data.statusCode === 409) {
            setAlreadyExists(true);
            setFirstName("");
            setLastName("");
            setUsername("");
            setEmail("");
            setPassword("");
        }


    };

    if (redirectToLogin) {
        return <Navigate to='/login?accountCreated=true' />
    }

    if (loggedIn) {
        return <Navigate to='/feed' />
    }

    return (
        <div className="font-sans antialiased bg-white">
            <div className="flex flex-col justify-center items-center md:pt-36 pt-24 mx-6">
                <div className="form w-full md:w-1/2">
                    <div className="tracking-wider mb-10">
                        {alreadyExists ? (
                            <>
                                <h1 className="md:text-3xl text-2xl mb-2">
                                    Sign Up for Picsgram
                                </h1>
                                <span>
                                    Username or email already exists. Please choose a different
                                    one.
                                </span>
                            </>
                        ) : (
                            <h1 className="md:text-3xl text-2xl">Sign Up for Picsgram</h1>
                        )}
                    </div>
                    <form onSubmit={signUp}>
                        <div className="w-full flex justify-center items-center">
                            <input
                                type="text"
                                min="4"
                                max="20"
                                placeholder="First Name"
                                name="first-name"
                                id="first-name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                className="w-1/2 mr-1 p-4 border border-gray-100 bg-gray-100 rounded-xl focus:border-gray-100 focus:outline-none focus:bg-white tracking-wide mb-4"
                                required
                            />
                            <input
                                type="text"
                                min="4"
                                max="30"
                                placeholder="Last Name"
                                name="last-name"
                                id="last-name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                className="w-1/2 ml-1 p-4 border border-gray-100 bg-gray-100 rounded-xl focus:border-gray-100 focus:outline-none focus:bg-white tracking-wide mb-4"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            min="4"
                            max="20"
                            placeholder="Username"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="w-full p-4 border border-gray-100 bg-gray-100 rounded-xl focus:border-gray-100 focus:outline-none focus:bg-white tracking-wide mb-4"
                            required
                        />
                        <input
                            type="email"
                            min="7"
                            max="320"
                            placeholder="Email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full p-4 border border-gray-100 bg-gray-100 rounded-xl focus:border-gray-100 focus:outline-none focus:bg-white tracking-wide mb-4"
                            required
                        />
                        <input
                            type="password"
                            min="8"
                            placeholder="Password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full p-4 border border-gray-100 bg-gray-100 rounded-xl focus:border-gray-100 focus:outline-none focus:bg-white tracking-wide mb-4"
                            required
                        />
                        <div className="flex flex-col items-start mb-4">
                            <span>
                                Already have an account?{" "}
                                <Link to="/login" className="underline hover:no-underline" >
                                    Log in
                                </Link>
                                .
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="p-4 bg-blue-400 text-white rounded-xl"
                        >
                            Create New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;