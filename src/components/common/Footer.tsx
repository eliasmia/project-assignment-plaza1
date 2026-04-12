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
        <footer className="relative bg-[#111214] p-6 pt-20 mt-auto">
          <div className="flex items-center justify-between p-0 max-w-[1280px] mx-auto text-white">
              <div className="flex flex-col items-start gap-2 max-w-[355px]">
                <h2>The Deep Work Blueprint</h2>
                <p>Master Focus & Get More Done in Less Time</p>
              </div>

              <div className="">
                 <div className="">
                    <div className="">
                      <img src="/assets/images/footer.png" alt="Footer Image" className="w-48 h-auto" />
                      <img src="/assets/images/footer.png" alt="Footer Image" className="w-48 h-auto" />
                      <img src="/assets/images/footer.png" alt="Footer Image" className="w-48 h-auto" />
                    </div>
                    <Link href="/"><FaArrowRight /></Link>
                 </div>
                 <p>Join with 5K other students</p>
               
              </div>
             
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-between pt-6 pb-13 gap-5 max-w-[1280px] mx-auto">
            <div className="text-white text-sm">© Copyright 2024, All Rights Reserved</div>
            <div className="footer-menu flex items-center gap-6 ml-6">
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