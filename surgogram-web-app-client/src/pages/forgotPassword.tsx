import React, { useState } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { passwordReset } from "@/services/authServices";
import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
  NotAcceptableException,
  UnexpectedException,
} from "@/utils/exceptions";

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendResetLink = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await passwordReset(email);
      toast.success("Password reset link sent successfully.");
    } catch (error) {
      if (error instanceof BadRequestException) {
        toast.error("Invalid request. Please check your input.");
      } else if (error instanceof NotFoundException) {
        toast.error("Email not found. Please try again.");
      } else if (error instanceof NotAcceptableException) {
        toast.error("Request not acceptable. Please try again.");
      } else if (error instanceof InternalServerException) {
        toast.error("Server error. Please try again later.");
      } else if (error instanceof UnexpectedException) {
        toast.error("An unexpected error occurred. Please try again.");
      } else {
        toast.error("Failed to send password reset link. Please try again.");
      }
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
        className="bg-white bg-opacity-10 rounded-xl p-4 sm:px-10 border-opacity-70 w-80 sm:w-96 h-[350px] flex flex-col items-center justify-center space-y-2"
        style={{ zIndex: 2 }}
      >
        <img src="/img/logo.png" alt="logo" className="w-40" />
        <h1 className="text-lg font-large text-center text-white opacity-90 font-semibold">
          Forgot Password
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
          <div className="flex flex-col items-center justify-center mt-4">
            <Button
              caption="Send Password Reset Link"
              onClick={() => handleSendResetLink()}
              width="w-full"
              background="bg-red-500"
            />
            <Link href="/signIn">
              <div className="mb-4 mt-2 text-white text-sm hover:text-red duration-300 transition-all ease-in-out cursor-pointer">
                Sign In Instead
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

export default ForgotPassword;
