import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import RouteProtector from "@/components/RouteProtector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TransitionWrapper from "@/components/TransitionWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsTransitioning(true);
    const handleRouteChangeComplete = () => setIsTransitioning(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <UserProvider>
      <RouteProtector>
        <TransitionWrapper isTransitioning={isTransitioning}>
          <Component {...pageProps} />
        </TransitionWrapper>
        <LoadingSpinner isTransitioning={isTransitioning} />
      </RouteProtector>
    </UserProvider>
  );
}
