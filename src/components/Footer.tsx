import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-navy-blue text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Highway Cab</h3>
          <p className="text-gray-400">Your trusted partner for intercity travel. Safe, reliable, and affordable rides across India.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul>
            <li><Link href="#how-it-works" className="hover:text-golden-yellow">How It Works</Link></li>
            <li><Link href="#vendor" className="hover:text-golden-yellow">For Vendors</Link></li>
            <li><Link href="#testimonials" className="hover:text-golden-yellow">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p>Email: support@highwaycab.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-golden-yellow">Facebook</Link>
            <Link href="#" className="hover:text-golden-yellow">Twitter</Link>
            <Link href="#" className="hover:text-golden-yellow">Instagram</Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Highway Cab. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;