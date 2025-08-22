import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '../data/navigation';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const _location = useLocation(); // Keeping for potential future use
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
    setUserMenuOpen(false);
  };

  const handleCommunityClick = (e: React.MouseEvent, item: any) => {
    if (item.external && item.path === '/community') {
      e.preventDefault();
      if (isAuthenticated) {
        window.location.href = '/community';
      } else {
        window.location.href = `/admin/login?return_to=${encodeURIComponent('/community')}`;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-dark-lighter shadow-md py-2' : 'bg-white dark:bg-dark-lighter shadow-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 mr-8" onClick={closeMenu}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-16 w-auto flex-shrink-0"
            >
              <img 
                src="/wharton.png" 
                alt="Wharton Alumni AI Studio and Research Center Logo"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            <motion.div 
              className="text-sm font-bold text-primary dark:text-white flex flex-col ml-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="whitespace-nowrap leading-tight">Wharton Alumni</span>
              <span className="whitespace-nowrap leading-tight">AI Studio and</span>
              <span className="whitespace-nowrap leading-tight">Research Center</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <div className="flex items-center cursor-pointer nav-link dark:text-white">
                    <span>{item.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                ) : (
                  item.external ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleCommunityClick(e, item)}
                      className="nav-link dark:text-gray-300 dark:hover:text-white"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        isActive 
                          ? 'nav-link-active dark:text-white' 
                          : 'nav-link dark:text-gray-300 dark:hover:text-white'
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
                )}

                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-dark-lighter rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.path}
                        className={({ isActive }) => 
                          `block px-4 py-2 text-sm ${
                            isActive 
                              ? 'text-primary dark:text-white bg-primary-light dark:bg-primary/20' 
                              : 'text-neutral-dark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-neutral-dark dark:text-white hover:text-primary dark:hover:text-primary"
                >
                  {user?.profile?.profileImageUrl ? (
                    <img 
                      src={user.profile.profileImageUrl} 
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                  )}
                  <span className="hidden lg:block">{user?.firstName}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={closeMenu}
                      >
                        <User className="mr-3 h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={closeMenu}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-neutral-dark dark:text-white hover:text-primary dark:hover:text-primary"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Join WAAIS
                </Link>
              </div>
            )}
            
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              className="text-neutral-dark dark:text-white hover:text-primary dark:hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-dark-lighter border-t dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-left py-2 nav-link dark:text-white"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div 
                            className="pl-4 mt-2 space-y-2 border-l-2 border-primary-light dark:border-primary/20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.children.map((child) => (
                              <NavLink
                                key={child.name}
                                to={child.path}
                                className={({ isActive }) => 
                                  `block py-2 ${
                                    isActive 
                                      ? 'text-primary dark:text-white' 
                                      : 'text-neutral-dark dark:text-gray-300'
                                  }`
                                }
                                onClick={closeMenu}
                              >
                                {child.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    item.external ? (
                      <a
                        href={item.path}
                        onClick={(e) => {
                          handleCommunityClick(e, item);
                          closeMenu();
                        }}
                        className="block py-2 text-neutral-dark dark:text-gray-300"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `block py-2 ${
                            isActive 
                              ? 'text-primary dark:text-white font-medium' 
                              : 'text-neutral-dark dark:text-gray-300'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        {item.name}
                      </NavLink>
                    )
                  )}
                </div>
              ))}
              
              {/* Mobile Auth buttons */}
              <div className="border-t dark:border-gray-700 pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 py-2">
                      {user?.profile?.profileImageUrl ? (
                        <img 
                          src={user.profile.profileImageUrl} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-neutral-dark dark:text-gray-300"
                      onClick={closeMenu}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center py-2 text-neutral-dark dark:text-gray-300"
                      onClick={closeMenu}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="flex items-center w-full py-2 text-neutral-dark dark:text-gray-300"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block py-2 text-neutral-dark dark:text-gray-300"
                      onClick={closeMenu}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 px-4 bg-primary text-white rounded-md text-center"
                      onClick={closeMenu}
                    >
                      Join WAAIS
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;