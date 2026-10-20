import { Link, useLocation } from "react-router-dom";
import { Menu, X, Trophy } from "lucide-react";
import { useState } from "react";
import { services } from "../data/services";

interface NavigationProps {
  onOpenLeadCapture?: () => void;
}

export default function Navigation({ onOpenLeadCapture }: NavigationProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    ...services.map((s) => ({ to: s.path, label: s.shortName })),
    { to: "/#contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path && !location.hash;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-slate-900 flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold text-slate-900 tracking-tight">We Win</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-semibold">
                Consultancy Group
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-emerald-600 hover:shadow-lg transition-all duration-200"
              >
                Free Strategy Call
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
                className="w-full mt-4 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold text-sm"
              >
                Free Strategy Call
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
