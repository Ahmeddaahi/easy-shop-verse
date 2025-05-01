
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShoppingCart, User, Menu, X, Search, UserCircle, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { cart } = useShop();
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border/40 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">Labis Online</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <form className="hidden md:flex items-center relative group">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="h-9 w-[180px] lg:w-[280px] pr-9 transition-all duration-300 border-muted focus:border-primary" 
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
              <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
            </Button>
          </form>
          
          {/* Cart Link */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* User Account */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 rounded-xl border-border/60 shadow-lg backdrop-blur bg-background/95">
                <DropdownMenuLabel className="font-semibold text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/40" />
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer flex items-center hover:bg-primary/5">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full cursor-pointer flex items-center hover:bg-primary/5">
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                
                {profile?.role === 'seller' && (
                  <DropdownMenuItem asChild>
                    <Link to="/seller/dashboard" className="w-full cursor-pointer hover:bg-primary/5">
                      Seller Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {profile?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="w-full cursor-pointer hover:bg-primary/5">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-border/40" />
                
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer flex items-center text-red-600 hover:bg-red-50 focus:bg-red-50"
                  data-testid="logout-dropdown"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm" className="font-medium">Login</Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md border-b shadow-md p-4 animate-fade-in z-50">
          <div className="flex flex-col gap-4">
            <form className="flex items-center mb-4 relative">
              <Input type="search" placeholder="Search products..." className="h-10 w-full pr-10" />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search size={18} />
              </Button>
            </form>
            
            <div className="flex flex-col space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-medium py-2.5 transition-colors hover:text-primary hover:bg-primary/5 px-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {user && (
              <div className="border-t border-border/30 mt-2 pt-2 space-y-1">
                <Link
                  to="/profile"
                  className="font-medium py-2.5 transition-colors hover:text-primary hover:bg-primary/5 flex items-center px-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                
                <Link
                  to="/orders"
                  className="font-medium py-2.5 transition-colors hover:text-primary hover:bg-primary/5 flex items-center px-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-medium py-2.5 transition-colors text-red-600 hover:text-red-700 hover:bg-red-50/80 flex items-center px-2 rounded-md"
                  data-testid="logout-mobile"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
