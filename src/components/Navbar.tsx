import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-700" />
            <span className="ml-2 text-xl font-bold text-slate-800">MediCare</span>
          </div>
          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Doctors</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Emergency</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Fundraising</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Dashboard</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-slate-700 hover:text-blue-700 transition-colors duration-300 relative group ${
                  isActive ? 'text-blue-700' : ''
                }`
              }
            >
              <span>Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;