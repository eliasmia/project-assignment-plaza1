import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";
const links = [
  { name: "Terms & Conditions", href: "/" },
  { name: "Refund Policy", href: "/" },
  { name: "Pricing", href: "/" },
  { name: "Support", href: "/" },
];

function Footer() {
  return (
        <footer className="relative bg-[#111214] px-6 py-8 mt-auto">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-5 max-w-[1280px] mx-auto">
            <div className="text-white text-sm">© Copyright 2024, All Rights Reserved</div>
            <div className="footer-menu flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </footer>

  )
}


export default Footer