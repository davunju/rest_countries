import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className=" dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700 shadow-sm">
      <section className="flex items-center justify-between py-4 w-full px-5 lg:px-10 mx-auto">
        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">
          Where in the world?
        </h1>
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default Navbar;
