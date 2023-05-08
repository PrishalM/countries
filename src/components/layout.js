import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

import React, { useEffect, useRef } from "react";

export default function Layout({ children }) {
  const main = useRef();
  const lightModeBtn = useRef();
  const darkModeBtn = useRef();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      darkMode();
    } else if (
      localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      lightMode();
    } else {
      localStorage.removeItem("theme");
      lightMode();
    }

    lightModeBtn.current.addEventListener("click", lightMode);
    darkModeBtn.current.addEventListener("click", darkMode);

    function lightMode() {
      lightModeBtn.current.classList.add("hidden");
      darkModeBtn.current.classList.remove("hidden");
      localStorage.theme = "light";
      main.current.classList.remove("dark");
    }

    function darkMode() {
      lightModeBtn.current.classList.remove("hidden");
      darkModeBtn.current.classList.add("hidden");
      localStorage.theme = "dark";
      main.current.classList.add("dark");
    }
  }, []);
  return (
    <main ref={main}>
      <div className="flex flex-col h-full bg-lightBG dark:bg-darkBG">
        {/* Navbar */}
        <div className="bg-lightElement dark:bg-darkElement drop-shadow-light dark:drop-shadow-dark text-lightText dark:text-darkText sticky top-0 z-10">
          <div className="container py-5 flex flex-row mx-auto px-10 justify-between">
            <Link href="/">
              <h1
                className={`${nunito_sans.className} text-xl font-bold hover:text-lightInputText dark:hover:text-lightInputText hover:underline`}
              >
                Countries
              </h1>
            </Link>
            <div className="flex items-center">
              <button className="flex flex-row " ref={darkModeBtn}>
                <FontAwesomeIcon
                  icon={faCircleHalfStroke}
                  className="pt-0.5 icon"
                />
                <p
                  className={`${nunito_sans.className} text-sm pl-1 hover:underline hover:text-lightInputText dark:hover:text-lightInputText`}
                >
                  Dark Mode
                </p>
              </button>
              <button className="flex flex-row " ref={lightModeBtn}>
                <FontAwesomeIcon
                  icon={faCircleHalfStroke}
                  className="pt-0.5 icon"
                />
                <p
                  className={`${nunito_sans.className} text-sm pl-1 hover:underline hover:text-lightInputText dark:hover:text-lightInputText`}
                >
                  Light Mode
                </p>
              </button>
            </div>
          </div>
        </div>
        {children}
        {/* Footer */}
        <div className="bg-lightElement dark:bg-darkElement  text-lightText dark:text-darkText sticky bottom-0 z-10 flex justify-center drop-shadow-light dark:drop-shadow-dark">
          <p className="p-1.5">
            Developed by{" "}
            <Link
              className="hover:text-lightInputText dark:hover:text-lightInputText hover:underline"
              href="https://prish.al/"
            >
              Prishal
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
