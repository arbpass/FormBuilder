import React from 'react'
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link to="/" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">home</Link>

          <Link to="/allForms" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">All Forms</Link>

          
        </div>
      </nav>
    </>
  )
}
