
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/shop' },
        { name: 'Featured', path: '/shop?featured=true' },
        { name: 'New Arrivals', path: '/shop?sort=newest' },
        { name: 'Special Offers', path: '/shop?discount=true' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Returns', path: '/returns' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];

  return (
    <footer className="bg-muted/30 mt-auto border-t border-border/20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand/Logo */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <span className="text-xl font-bold text-primary">Labis Online</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          {/* Footer Link Sections */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-semibold mb-5 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Labis Online. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
