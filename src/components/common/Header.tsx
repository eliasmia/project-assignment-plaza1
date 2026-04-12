import Link from 'next/link'
import Image from 'next/image';
import MobileMenu from './header/MobileManu';
import NavItem from './header/NavItem';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-black-800 p-0 pb-8 bg-[#ddf0f4]">
        <div className="flex items-center justify-between p-0 max-w-[1280px] mx-auto">
           <div className="logo">
             <Link href="/" className="flex items-center">
                <Image 
                    src="/images/logo.png" 
                    alt="Logo" 
                    width={230} 
                    height={28} 
                    priority 
                />
              </Link>
           </div>

            <div className="hidden md:flex items-center gap-2">
               <NavItem />
            </div> 

            <div className="md:hidden flex items-center gap-4">
                <MobileMenu />
            </div>

         

        </div>
 
    </header>  
  )
}

export default Header