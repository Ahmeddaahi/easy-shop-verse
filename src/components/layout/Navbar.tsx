import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
const Navbar: React.FC = () => {
  const {
    user: shopUser,
    cart,
    logout,
    isAuthenticated
  } = useShop();
  const {
    user,
    profile,
    signOut
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Shop',
    path: '/shop'
  }, {
    name: 'Categories',
    path: '/categories'
  }];
  return <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">Labis Online</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => <Link key={link.name} to={link.path} className="font-medium transition-colors hover:text-primary">
                {link.name}
              </Link>)}
          </nav>
        </div>
        
        {/* Search and Actions */}
        <div className="flex items-center gap-2">
          <form className="hidden md:flex items-center">
            <Input type="search" placeholder="Search products..." className="h-9 w-[180px] lg:w-[280px]" />
            <Button type="submit" variant="ghost" size="icon">
              <Search size={18} />
            </Button>
          </form>
          
          {/* Cart Link */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  {cartItemsCount}
                </Badge>}
            </Button>
          </Link>
          
          {/* User Account */}
          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                {profile?.role === 'seller' && <DropdownMenuItem asChild>
                    <Link to="/seller/dashboard" className="w-full cursor-pointer">Seller Dashboard</Link>
                  </DropdownMenuItem>}
                {profile?.role === 'admin' && <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="w-full cursor-pointer">Admin Dashboard</Link>
                  </DropdownMenuItem>}
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            <form className="flex items-center mb-2">
              <Input type="search" placeholder="Search products..." className="h-9 w-full" />
              <Button type="submit" variant="ghost" size="icon">
                <Search size={18} />
              </Button>
            </form>
            {navLinks.map(link => <Link key={link.name} to={link.path} className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>)}
          </div>
        </div>}
    </header>;
};
export default Navbar;