import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Supplements', href: '/shop?category=supplements' },
    { name: 'Vitamins', href: '/shop?category=vitamins' },
    { name: 'Skincare', href: '/shop?category=skincare' },
    { name: 'Hair Care', href: '/shop?category=hair-care' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping & Returns', href: '/policies/shipping-returns' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Order', href: '/track-order' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/policies/privacy' },
    { name: 'Terms of Service', href: '/policies/terms' },
    { name: 'Refund Policy', href: '/policies/refund' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-forest text-cream">
      {/* Newsletter Section */}
      <div className="border-b border-cream/10">
        <div className="container-custom py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-semibold mb-2">
                Join the VitaCare Family
              </h3>
              <p className="text-cream/70 max-w-md">
                Subscribe for exclusive offers, wellness tips, and 15% off your first order.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 h-12 px-4 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/30"
              />
              <button
                type="submit"
                className="h-12 px-6 bg-cream text-forest font-semibold rounded-lg hover:bg-cream/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                <span className="text-forest font-serif font-bold text-xl">V</span>
              </div>
              <span className="font-serif text-xl font-semibold">VitaCare</span>
            </Link>
            <p className="text-cream/70 mb-6 max-w-sm">
              Your trusted source for premium health and wellness products. 
              Quality ingredients, sustainable practices, and your wellbeing at heart.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@vitacare.com" className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors">
                <Mail className="h-4 w-4" />
                hello@vitacare.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-cream/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                123 Wellness Street, Health City, HC 12345
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-cream/70 hover:text-cream transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-cream/70 hover:text-cream transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-cream/70 hover:text-cream transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-cream/70 hover:text-cream transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()} VitaCare. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-cream/50 hover:text-cream transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
