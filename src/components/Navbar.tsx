import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/HighwayCabLogo.png"
              alt="HighwayCab Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}