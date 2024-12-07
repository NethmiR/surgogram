import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";
import LoadingScreen from "@/components/LoadingScreen";
import { isTokenExpiredFunction, getTokenContent } from "@/utils/authUtils";
import { getUserById } from "@/services/userService";

export default function RouteProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenExpiry = async (): Promise<boolean> => {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      return !isTokenExpiredFunction(token);
    };

    const getUserDetails = async (token: string | null) => {
      if (!token) {
        return null;
      }
      const content = getTokenContent(token);
      if (!content || typeof content === "string" || !("id" in content)) {
        return null;
      }
      try {
        const response = await getUserById(content.id);
        if (!response) {
          return null;
        }
        return response;
      } catch {
        return null;
      }
    };

    const checkAccess = async () => {
      if (!user) {
        const tokenValid = await checkTokenExpiry();
        if (!tokenValid) {
          console.log("token not valid");
          router.push("/signIn");
          return;
        }
        const userDetails = await getUserDetails(localStorage.getItem("token"));
        if (!userDetails) {
          console.log("user details not found");
          router.push("/signIn");
          return;
        }
        setUser(userDetails);
      }
      setLoading(false);
    };

    if (
      router.pathname === "/homeScreen" ||
      router.pathname === "/userDetails"
    ) {
      checkAccess();
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
