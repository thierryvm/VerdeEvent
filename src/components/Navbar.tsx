import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, TreePine, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600">Verdevent</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/oceane-event-planner" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600">
              <Flower2 className="w-4 h-4 mr-1" />
              Oceane Event Planner
            </Link>
            <Link to="/vertiyo" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600">
              <TreePine className="w-4 h-4 mr-1" />
              Vertiyo
            </Link>
            <Link to="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600">
              Blog
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/oceane-event-planner"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
              onClick={() => setIsOpen(false)}
            >
              <Flower2 className="w-4 h-4 mr-2" />
              Oceane Event Planner
            </Link>
            <Link
              to="/vertiyo"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
              onClick={() => setIsOpen(false)}
            >
              <TreePine className="w-4 h-4 mr-2" />
              Vertiyo
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;