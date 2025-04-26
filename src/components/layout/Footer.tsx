import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [{
    title: 'Shop',
    links: [{
      name: 'All Products',
      path: '/shop'
    }, {
      name: 'Featured',
      path: '/shop?featured=true'
    }, {
      name: 'New Arrivals',
      path: '/shop?sort=newest'
    }, {
      name: 'Special Offers',
      path: '/shop?discount=true'
    }]
  }, {
    title: 'Customer Service',
    links: [{
      name: 'Contact Us',
      path: '/contact'
    }, {
      name: 'FAQs',
      path: '/faq'
    }, {
      name: 'Shipping Policy',
      path: '/shipping'
    }, {
      name: 'Returns',
      path: '/returns'
    }]
  }, {
    title: 'Company',
    links: [{
      name: 'About Us',
      path: '/about'
    }, {
      name: 'Careers',
      path: '/careers'
    }, {
      name: 'Become a Seller',
      path: '/seller-signup'
    }, {
      name: 'Terms of Service',
      path: '/terms'
    }]
  }];
  return <footer className="bg-muted mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Logo */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <span className="text-xl font-bold text-primary">Labis Online</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="mt-4 flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          {/* Footer Link Sections */}
          {footerLinks.map(section => <div key={section.title}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => <li key={link.name}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          <p className="text-base">© {currentYear} ShopVerse. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline mx-2">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;