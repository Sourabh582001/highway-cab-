'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B1E3D] shadow-md">
      <nav className="container max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="h-10 bg-golden-yellow rounded-lg flex items-center justify-center">
              <span className="text-[#0B1E3D] font-bold text-lg">HC</span>
            </div> */}
            <span className="text-xl font-bold text-white">HighwayCab</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-gray-300 hover:text-golden-yellow transition-colors">How It Works</Link>
          <Link href="#why-us" className="text-gray-300 hover:text-golden-yellow transition-colors">Why Choose Us</Link>
          <Link href="#top-routes" className="text-gray-300 hover:text-golden-yellow transition-colors">Top Routes</Link>
          <Link href="#vendor" className="text-gray-300 hover:text-golden-yellow transition-colors">Vendors</Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-golden-yellow transition-colors">Testimonials</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#booking" className="hidden md:block bg-[#FFC300] text-[#0B1E3D] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">Book Your Ride</Link>
          <ThemeToggle />
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-[#0B1E3D] border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#how-it-works" className="block text-gray-300 hover:text-golden-yellow px-3 py-2 rounded-md text-base font-medium transition-colors">How It Works</Link>
            <Link href="#why-us" className="block text-gray-300 hover:text-golden-yellow px-3 py-2 rounded-md text-base font-medium transition-colors">Why Choose Us</Link>
            <Link href="#top-routes" className="block text-gray-300 hover:text-golden-yellow px-3 py-2 rounded-md text-base font-medium transition-colors">Top Routes</Link>
            <Link href="#vendor" className="block text-gray-300 hover:text-golden-yellow px-3 py-2 rounded-md text-base font-medium transition-colors">Vendors</Link>
            <Link href="#testimonials" className="block text-gray-300 hover:text-golden-yellow px-3 py-2 rounded-md text-base font-medium transition-colors">Testimonials</Link>
            <Link href="#booking" className="block w-full text-center bg-[#FFC300] text-[#0B1E3D] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors mt-2">Book Your Ride</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;