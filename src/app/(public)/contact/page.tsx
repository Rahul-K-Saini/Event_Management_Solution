
import Link from 'next/link'
import { Mail, Linkedin, Github, Globe } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">Event Management Solution</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Get in Touch</CardTitle>
              <CardDescription className="dark:text-gray-300">Feel free to reach out through any of these platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="mailto:rahul545436@gmail.com" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                <Mail size={20} />
                <span>rahul545436@gmail.com</span>
              </Link>
              <Link href="https://www.linkedin.com/in/rahulksaini987/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                <Linkedin size={20} />
                <span>LinkedIn Profile</span>
              </Link>
              <Link href="https://github.com/Rahul-K-Saini" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                <Github size={20} />
                <span>GitHub Profile</span>
              </Link>
              <Link href="https://rahulsaini.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                <Globe size={20} />
                <span>Portfolio Website</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Send a Message</CardTitle>
              <CardDescription className="dark:text-gray-300">We&apos;ll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Input type="text" placeholder="Your Name" required className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" required className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" required className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">Send Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

