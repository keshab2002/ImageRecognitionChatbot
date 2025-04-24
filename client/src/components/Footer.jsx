import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              PixelMind
            </span>
            <p className="text-gray-400 text-base">
              The future of image recognition and analysis, powered by advanced AI.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-github"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-discord"></i>
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Gaming</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Content Creation</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">E-commerce</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Social Media</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Pricing</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Documentation</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Guides</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">API Status</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-400 hover:text-gray-300">About</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Blog</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Jobs</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Partners</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Privacy</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Terms</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Cookie Policy</Link></li>
                  <li><Link to="#" className="text-base text-gray-400 hover:text-gray-300">Licensing</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 PixelMind, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
