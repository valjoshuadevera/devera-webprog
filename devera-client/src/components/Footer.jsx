import { Link } from "react-router-dom";
import logo from "../assets/images/wwelogos.png";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Logo / Brand */}
        <div className="flex flex-col gap-4">
          <img src={logo} alt="WWE Logo" className="h-9 w-9" />
          <p className="text-sm text-white/90">
            World Wrestling Entertainment. Bringing you the best in sports entertainment worldwide.
          </p>
        </div>

        {/* Events */}
        <div>
          <h3 className="font-semibold mb-4">Events</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/articles" className="hover:text-black">Upcoming Events</Link></li>
            <li><Link to="/articles/wrestlemania" className="hover:text-black">WrestleMania</Link></li>
            <li><Link to="/articles/backlash" className="hover:text-black">Backlash</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-black">About WWE</Link></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
            <li><a href="#" className="hover:text-black">News</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Facebook</a></li>
            <li><a href="#" className="hover:text-black">Twitter (X)</a></li>
            <li><a href="#" className="hover:text-black">Instagram</a></li>
            <li><a href="#" className="hover:text-black">YouTube</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-red-500 text-center py-4 text-xs text-white/80">
        © {new Date().getFullYear()} WWE Clone. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;