"use client"

import { motion } from "framer-motion"
import { Building, Users, Globe, Award, TrendingUp, Heart } from "lucide-react"
import type { Company } from "@/components/timeline-explorer"
import { useTheme } from "@/components/theme-provider"

interface CompanyInfoProps {
  company: Company
}

export default function CompanyInfo({ company }: CompanyInfoProps) {
  const { theme } = useTheme()

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const cardBgClass =
    theme === "dark"
      ? "bg-gray-800/20 backdrop-blur-sm border-gray-700/20"
      : "bg-white/80 backdrop-blur-sm border-gray-200/40 shadow-xl"

  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600"

  return (
    <motion.div
      variants={infoVariants}
      initial="hidden"
      animate="visible"
      className={`${cardBgClass} rounded-xl p-6 transition-colors duration-300 hover-lift`}
      whileHover={{
        boxShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.15)" : "0 0 30px rgba(168, 85, 247, 0.1)",
      }}
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 neon-gradient-text">
            {company.name}
          </motion.h2>

          <motion.div variants={itemVariants} className="grid gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Founded:</span> {company.founded} by {company.founder}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Headquarters:</span> {company.headquarters}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-500" />
              <span className="font-medium">Employees:</span> {company.employees}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Revenue:</span> {company.revenue}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {company.description.split("\n\n").map((paragraph, i) => (
              <p key={i} className={`mb-4 ${textClass} transition-colors duration-300`}>
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 neon-text-blue">
            <Award className="h-5 w-5 text-blue-500" />
            Key Achievements
          </h3>
          <ul className="space-y-3">
            {company.keyAchievements.map((achievement, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Heart className="h-4 w-4 text-purple-500 mt-1 shrink-0" />
                <span className={`${textClass} transition-colors duration-300`}>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

