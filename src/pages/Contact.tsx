import React from 'react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Clock, Globe } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 pt-8">
          <nav className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">FX Clock</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/position-size-calculator" className="text-gray-300 hover:text-white transition-colors">Position Size Calculator</Link>
              {/* <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link> */}
            </div>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
              <Globe className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Contact FX Clock</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you have questions, suggestions, or feedback, feel free to reach out to us.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-4">
              For support or inquiries, you can contact us via email, social media, or our contact form.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Email:</strong> <a href="mailto:c9hariom@gmail.com" className="text-blue-400 hover:underline">c9hariom@gmail.com</a>
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Instagram:</strong> <a href="https://instagram.com/c9hariom" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">c9hariom</a>
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Facebook:</strong> <a href="https://facebook.com/c9hariom" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">c9hariom</a>
            </p>
            <p className="text-gray-300 mb-4">
              <strong>X (formerly Twitter):</strong> <a href="https://x.com/c9hariom" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">c9hariom</a>
            </p>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6">Contact Form</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Your Message"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
