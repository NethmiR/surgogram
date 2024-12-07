import React, { useState } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import SingleImageUpload from "@/components/SingleImageUpload";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";
import { UpdateUserInterface } from "@/interfaces/userInterface";
import { updateUser } from "@/services/userService";

const UserDetails: React.FC = () => {

    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);


    const router = useRouter();

    React.useEffect(() => {
        if (!user || !user.id) {
            toast.error("User ID not found");
            router.push("/signUp");
        }
    }, [user, router]);

    const handleGoAhead = async () => {
        // Validate inputs
        if (!userName || !file || !fullName) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);

        const userData: UpdateUserInterface = {
            fullName,
            userName,
            imageFile: file,
        };

        try {
            if (user && user.id) {
                const updatedUser = await updateUser(userData, user.id);
                setUser(updatedUser);
                toast.success("User updated successfully");
                router.push("/signIn");
            }
        } catch (error) {
            toast.error("Failed to update user");
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
                className="bg-white bg-opacity-10 rounded-xl p-4 sm:px-10 border-opacity-70 w-80 sm:w-96 h-[550px] flex flex-col items-center justify-center space-y-2"
                style={{ zIndex: 2 }}
            >
                <img src="/img/logo.png" alt="logo" className="w-40" />
                <h1 className="text-lg font-large text-center text-white opacity-90 font-semibold">
                    User Details
                </h1>
                {/* hr */}
                <div className="w-full h-0.5 bg-white opacity-20"></div>
                {/* form */}
                <div className="w-full mt-4">
                    <TextBox
                        caption="Username"
                        value={userName}
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUserName(e)}
                        captionClassName="text-center"
                    />
                    <TextBox
                        caption="Full Name"
                        value={fullName}
                        type="text"
                        placeholder="Enter your full name"
                        onChange={(e) => setFullName(e)}
                        captionClassName="text-center"
                    />
                    <SingleImageUpload
                        name="imageInput"
                        file={file}
                        setFile={setFile}
                        maxFileSize={5000000} // 5MB
                        caption="Uplaod User Photo"
                        currentImage={currentImage}
                        width="w-full"
                        captionClassName="text-center"
                    />
                    <div className="flex flex-col items-center justify-center mt-4">
                        <Button caption="Go Ahead" onClick={handleGoAhead} width="w-full" background="bg-red-500" />
                    </div>
                </div>
            </div>
            <Toast />
            <Spinner isVisible={loading} />
        </div>
    );
};

export default UserDetails;