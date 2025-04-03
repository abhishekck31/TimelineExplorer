"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 dark:bg-gray-800/20 dark:border-gray-700/30 dark:hover:bg-gray-800/30 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === "light" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={{ opacity: theme === "light" ? 1 : 0 }}
          animate={{ opacity: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5 text-yellow-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: theme === "dark" ? 1 : 0 }}
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5 text-blue-400" />
        </motion.div>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

