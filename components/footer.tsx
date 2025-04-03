"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  const footerBgClass =
    theme === "dark" ? "bg-gray-900 border-t border-gray-800" : "bg-gray-50 border-t border-gray-200"

  const textClass = theme === "dark" ? "text-gray-400" : "text-gray-600"

  const linkClass = theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-purple-600"

  return (
    <footer className={`${footerBgClass} transition-colors duration-300 py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 neon-gradient-text">Corporate Timeline Explorer</h3>
            <p className={`${textClass} mb-4 max-w-md transition-colors duration-300`}>
              An interactive platform for exploring and managing corporate histories through dynamic, animated
              timelines. Create, edit, and visualize company milestones with ease.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className={linkClass}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                className={linkClass}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                className={linkClass}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                className={linkClass}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 neon-text-blue">Features</h4>
            <ul className={`space-y-2 ${textClass} transition-colors duration-300`}>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Interactive Timelines
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Company Management
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Event Filtering
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Data Visualization
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Timeline Sharing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 neon-text-purple">Resources</h4>
            <ul className={`space-y-2 ${textClass} transition-colors duration-300`}>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Examples
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className={`hover:underline ${linkClass}`}>
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 pt-8 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"} flex flex-col md:flex-row justify-between items-center transition-colors duration-300`}
        >
          <p className={textClass}>&copy; {currentYear} Corporate Timeline Explorer. All rights reserved.</p>
          <p className={`${textClass} flex items-center mt-4 md:mt-0 transition-colors duration-300`}>
            Made with <Heart size={16} className="mx-1 text-red-500" /> using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

