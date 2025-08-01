import { BookOpen, Mail, Phone, MapPin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold">LibraryMS</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              A modern library management system designed to streamline book operations, borrowing, and inventory management.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/books" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  All Books
                </a>
              </li>
              <li>
                <a href="/create-book" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Add New Book
                </a>
              </li>
              <li>
                <a href="/borrow-summary" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Borrow Summary
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Book Management</li>
              <li className="text-gray-300 text-sm">Inventory Tracking</li>
              <li className="text-gray-300 text-sm">Borrow System</li>
              <li className="text-gray-300 text-sm">Real-time Updates</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">support@libraryms.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Library St, Book City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 Library Management System. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;