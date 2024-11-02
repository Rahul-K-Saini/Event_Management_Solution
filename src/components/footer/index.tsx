import Link from "next/link";
import { quickLinks } from "@/data/footer";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-gray-900 bg-[#4C5666] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">EventManager</h3>
            <p className="text-sm font-inter">
              Your go-to platform for managing and discovering amazing events.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-300 font-inter"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://twitter.com/eventmanager"
                aria-label="Twitter"
                className="hover:text-gray-300"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="transition-colors"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/eventmanager"
                aria-label="LinkedIn"
                className="hover:text-gray-300"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="transition-colors"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/eventmanager"
                aria-label="GitHub"
                className="hover:text-gray-300"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="transition-colors"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <a
              href="mailto:info@eventmanager.com"
              className="inline-flex items-center justify-center sm:justify-start hover:text-gray-300 font-inter"
              aria-label="Email us"
            >
              <svg width="24" height="24" fill="currentColor" className="mr-2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" stroke="currentColor" fill="none"/>
              </svg>              info@eventmanager.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>© {currentYear} EventManager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
