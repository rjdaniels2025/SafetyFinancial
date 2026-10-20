import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentSection?: string;
  onOpenLeadCapture?: () => void;
}

export default function Navigation({ onOpenLeadCapture }: NavigationProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/credit-repair", label: "Credit Repair" },
    { to: "/final-expense", label: "Final Expense" },
    { to: "/disability-insurance", label: "Disability Insurance" },
    { to: "/income-replacement-insurance", label: "Income Replacement" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Safety Financial
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          {onOpenLeadCapture && (
            <div className="hidden lg:block">
              <button
                onClick={onOpenLeadCapture}
                className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {onOpenLeadCapture && (
              <button
                onClick={() => {
                  onOpenLeadCapture();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}