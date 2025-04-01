"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileCode, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-brand-blue to-brand-teal p-1.5 rounded text-white">
                <FileCode size={20} />
              </div>
              <span className="font-bold text-gray-900 text-lg">PDF2XML</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-brand-blue font-medium">Features</a>
            <a href="#" className="text-gray-700 hover:text-brand-blue font-medium">How It Works</a>
            <a href="#" className="text-gray-700 hover:text-brand-blue font-medium">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-brand-blue font-medium">Docs</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href={{
              pathname: "/auth",
              query: {
                authType:"signin"
              }
            }}>
              <Button variant="ghost" className="text-gray-700">Sign In</Button>
            </Link>
            <Link href={{
              pathname: "/auth",
              query: {
                authType:"signup"
              }
            }}>
              <Button className="bg-brand-blue hover:bg-blue-800 text-white">Get Started</Button>
              </Link>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-brand-blue font-medium py-2">Features</a>
            <a href="#" className="block text-gray-700 hover:text-brand-blue font-medium py-2">How It Works</a>
            <a href="#" className="block text-gray-700 hover:text-brand-blue font-medium py-2">Pricing</a>
            <a href="#" className="block text-gray-700 hover:text-brand-blue font-medium py-2">Docs</a>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="ghost" className="text-gray-700 justify-center">Sign In</Button>
              <Button className="bg-brand-blue hover:bg-blue-800 text-white justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
