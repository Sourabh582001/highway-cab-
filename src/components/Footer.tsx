import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-white py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/HighwayCabLogo.png"
                alt="HighwayCab Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Your trusted partner for intercity travel. We provide safe, comfortable, and reliable cab services across major cities.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-golden-yellow hover:text-yellow-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-golden-yellow hover:text-yellow-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-golden-yellow hover:text-yellow-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-golden-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cabs" className="text-gray-300 hover:text-golden-yellow transition-colors">
                  Book a Cab
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-golden-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-golden-yellow transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-golden-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-golden-yellow w-4 h-4" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-golden-yellow w-4 h-4" />
                <span className="text-gray-300">support@highwaycab.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-golden-yellow w-4 h-4" />
                <span className="text-gray-300">123 Travel Street, City Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 HighwayCab. All rights reserved. | 
            <Link href="#" className="hover:text-golden-yellow transition-colors ml-1">
              Privacy Policy
            </Link> | 
            <Link href="#" className="hover:text-golden-yellow transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}