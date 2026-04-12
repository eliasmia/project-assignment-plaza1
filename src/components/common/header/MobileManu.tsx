 "use client";
import { Span } from 'next/dist/trace';
import React, { useState } from 'react'
// import { Menu, X, Phone } from "lucide-react";


function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["About", "Curriculum", "Testimonials", "Pricing"];
  return (
    <div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <span className='text-white text-xl'>close</span>: <span className='text-white text-xl'>Menu</span>}
        </button>

         {isOpen && (
        <div className="md:hidden  border-border bg-background/95 backdrop-blur-xl p-4 absolute top-full left-0 right-0 z-50">
          {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
        </div>
      )}
    </div>
  )
}

export default MobileMenu