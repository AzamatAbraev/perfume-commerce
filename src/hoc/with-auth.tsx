"use client"
import React from "react";
import useAuth from "@/store/auth"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from "react";

function protectedPage<P extends React.JSX.IntrinsicAttributes>(Component: React.ComponentType<P>){
  const AuthComponent = (props: P) => {
    const {isAuthenticated, user} = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (isAuthenticated) {
        if (pathname.startsWith("/admin") && user?.role === 0) {
          router.push("/login")
        }
      } else {
        router.push("/login");
      }
    }, [isAuthenticated, router, pathname, user])

    return <Component {...props}/>
  }

  return AuthComponent;
}

export default protectedPage;