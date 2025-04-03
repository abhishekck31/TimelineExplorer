"use client"

import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Company } from "@/components/timeline-explorer"
import { useTheme } from "@/components/theme-provider"

interface CompanySelectorProps {
  companies: Company[]
  selectedCompanyId: string
  onSelectCompany: (companyId: string) => void
}

export default function CompanySelector({ companies, selectedCompanyId, onSelectCompany }: CompanySelectorProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Select value={selectedCompanyId} onValueChange={onSelectCompany}>
        <SelectTrigger
          className={`${theme === "dark" ? "bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500/50" : "bg-white/50 backdrop-blur-sm border-gray-200 hover:border-purple-500/50"} transition-colors duration-300 hover-lift`}
        >
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}

