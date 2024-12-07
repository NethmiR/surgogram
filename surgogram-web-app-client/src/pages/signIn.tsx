import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { LoginResponseInterface, UserInterface } from "@/interfaces/userInterface";
import { loginUser } from "@/services/authServices";
import { useUser } from "@/context/userContext";
import { isTokenExpiredFunction } from "@/utils/authUtils";

const Signin: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();

    const [email, setEmail] = useState("rathnayakenethmiit@gmail.com");
    const [password, setPassword] = useState("NethmiR123");

    const router = useRouter();

    //if already logged in then gets direct to home screen
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (user && user.id && token && !isTokenExpiredFunction(token)) {
            router.push("/homeScreen");
        }
        if (user && user.email) {
            setEmail(user.email);
        }
    }, [user, router]);

    useEffect(() => {
        // Remove token whenever user visits 
        localStorage.removeItem("token");
    }, []);

    const handleSignIn = async () => {
        // Validate inputs
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email");
            setEmail("");
            return;
        }

        setLoading(true);

        try {
            const updatedUser = await loginUser(email, password);
            localStorage.setItem("token", updatedUser.token);
            setUser(updatedUser.user);
            toast.success("Sign in successful");
            router.push("/homeScreen");
        }
        catch (error) {
            toast.error((error as Error).message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-10 bg-blur-3xl bg-gradient-to-r from-blue-500 to-blue-700
        flex items-center justify-center text-black"
            style={{ backgroundImage: `url('/img/back.jpg')` }}
        >
            <div
                className="absolute w-screen h-screen bg-black bg-opacity-60 backdrop-blur-md"
                style={{ zIndex: 1 }}
            ></div>
            <div
                className="bg-white bg-opacity-10 rounded-xl p-4 sm:px-10 border-opacity-70 w-80 sm:w-96 h-[450px] flex flex-col items-center justify-center space-y-2"
                style={{ zIndex: 2 }}
            >
                <img src="/img/logo.png" alt="logo" className="w-40" />
                <h1 className="text-lg font-large text-center text-white opacity-90 font-semibold">
                    Sign In
                </h1>
                {/* hr */}
                <div className="w-full h-0.5 bg-white opacity-20"></div>
                {/* form */}
                <div className="w-full mt-4">
                    <TextBox
                        caption="Email"
                        value={email}
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e)}
                        captionClassName="text-center"
                    />
                    <TextBox
                        caption="Password"
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e)}
                        componentClassName={"mt-4 text-center"}
                    />
                    <Link href="/admin/auth/forgotpassword">
                        <div className="mb-4 mt-2 text-gray-400 text-center text-sm hover:text-white duration-300 transition-all ease-in-out cursor-pointer">
                            Forgot Password?
                        </div>
                    </Link>
                    <div className="flex flex-col items-center justify-center mt-4">
                        <Button caption="SIGN IN" onClick={handleSignIn} width="w-full" background="bg-red-500" />
                        <Link href="/singUp">
                            <div className="mb-4 mt-2 text-white text-sm hover:text-red duration-300 transition-all ease-in-out cursor-pointer">
                                Don't have an account? Sign Up
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Toast />
            <Spinner isVisible={loading} />
        </div>
    );
};

export default Signin;
