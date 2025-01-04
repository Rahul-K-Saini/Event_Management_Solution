"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/theme-toggle";
import navLinks from "@/data/navlinks";
import { getUser, logoutUser } from "@/lib/dal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  console.log(loggedInUser)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setLoggedInUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-[#0B0B0B]"
      }`}
    >
      <div className="max-w-7xl mx-auto py-1 px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                EventManager
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center ml-40">
            <ul className="flex space-x-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`font-inter text-base font-medium transition-colors ${
                      isActive(href)
                        ? "text-gray-900 dark:text-white font-semibold underline underline-offset-4"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {loggedInUser ? (
              <Button
                onClick={handleLogout}
                className="hidden md:inline-flex bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  className="hidden md:inline-flex bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="hidden md:inline-flex bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Link href="/join-as-company">Join as Company</Link>
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(href)
                    ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 underline underline-offset-4"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
            {loggedInUser ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/join-as-company"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Join as Company
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
