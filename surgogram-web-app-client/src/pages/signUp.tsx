import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { createUser } from "@/services/userService";
import { CreateUserInterface, UserInterface } from "@/interfaces/userInterface";
import { useUser } from "@/context/userContext";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const { setUser } = useUser();

    useEffect(() => {
        // Reset token whenever user visits 
        localStorage.removeItem("token");
    }, []);

    const handleSignUp = async () => {
        // Validate inputs
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", { className: "bg-red-500 text-white" });
            setPassword("");
            setConfirmPassword("");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email", { className: "bg-red-500 text-white" });
            setEmail("");
            return;
        }

        if (!email || !password || !confirmPassword) {
            toast.error("Please fill all the fields", { className: "bg-red-500 text-white" });
            return;
        }

        setLoading(true);

        const userData: CreateUserInterface = { email, password };

        try {
            const user: UserInterface = await createUser(userData);
            setUser(user); // Set the user context
            toast.success("Sign up successful");
            router.push("/userDetails");
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
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
                    Sign Up
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
                    <TextBox
                        caption="Confirm Password"
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e)}
                        componentClassName={"mt-4 text-center"}
                    />

                    <div className="flex flex-col items-center justify-center mt-4">
                        <Button caption="SIGN UP" onClick={handleSignUp} width="w-full" background="bg-red-500" />
                        <Link href="/signIn">
                            <div className="mb-4 mt-2 text-white text-sm hover:text-red duration-300 transition-all ease-in-out cursor-pointer">
                                Already have an account? Sign In
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

export default SignUp;
