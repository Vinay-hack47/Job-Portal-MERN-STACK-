import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-black">Career<span className="text-red-600">Path</span></h2>
          <p className="mt-3 text-sm">
            Empowering your career journey with trusted job opportunities and real connections.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition">Browse Jobs</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Companies</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Categories</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Career Tips</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-600"><FaLinkedin /></a>
            <a href="#" className="hover:text-blue-600"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-600"><FaInstagram /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-300 mt-8 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CareerPath. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
