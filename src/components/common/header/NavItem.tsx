import React from 'react'
import Link from 'next/link'

 export const NAV_LINKS = [
  { label: 'Kisti Surokhha', path: '/' },
  { label: 'B2B', path: '#' },
  { label: 'Virtual Showroom', path: '#' },
  { label: 'Login', path: '#' },
  { label: 'Plaza List', path: '#' },
  { label: 'Feedback', path: '#' },
  { label: 'বাংলা', path: '#' },
];

function NavItem() {
  return (
    <>
      {NAV_LINKS.map((link) => (
         <Link key={link.path} href={link.path} className="text-[#042f56] px-4 py-2 rounded-b-lg hover:text-white hover:bg-[#042f56] transition-colors duration-300">
           {link.label}
         </Link>
      ))}
    </>
      
  )
}

export default NavItem