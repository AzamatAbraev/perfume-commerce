"use client";
import { useState, useEffect } from "react";

const useScreenSize = (): number => {
  const [screenSize, setScreenSize] = useState<number>(0); // Initialize with a default value

  useEffect(() => {
    // Access window.innerWidth after the component has mounted
    setScreenSize(window.innerWidth);

    // Add an event listener to update screenSize when the window is resized
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
