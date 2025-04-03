"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CompanySelector from "@/components/company-selector"
import CompanyInfo from "@/components/company-info"
import Timeline from "@/components/timeline"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { initialCompanies } from "@/data/initial-data"
import { useTheme } from "@/components/theme-provider"

export type Company = {
  id: string
  name: string
  founded: string
  founder: string
  headquarters: string
  employees: string
  revenue: string
  description: string
  keyAchievements: string[]
  events: TimelineEvent[]
}

export type TimelineEvent = {
  id: number
  title: string
  date: string
  category: string
  description: string
  image: string
  color: string
  details?: string
}

export default function TimelineExplorer() {
  const { theme } = useTheme()
  // Load companies from local storage or use initial data
  const [companies, setCompanies] = useLocalStorage<Company[]>("timeline-companies", initialCompanies)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0]?.id || "")
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false)
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    founded: "",
    founder: "",
    headquarters: "",
    employees: "",
    revenue: "",
    description: "",
    keyAchievements: [""],
  })

  // Set the first company as selected when companies change
  useEffect(() => {
    if (companies.length > 0 && !companies.find((c) => c.id === selectedCompanyId)) {
      setSelectedCompanyId(companies[0].id)
    }
  }, [companies, selectedCompanyId])

  const selectedCompany = companies.find((company) => company.id === selectedCompanyId) || companies[0]

  // Handle company selection
  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId)
  }

  // Handle adding a new company
  const handleAddCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newCompany: Company = {
      ...formData,
      id: formData.id || Date.now().toString(),
      events: [],
    }

    setCompanies([...companies, newCompany])
    setSelectedCompanyId(newCompany.id)
    setIsAddCompanyOpen(false)
    resetForm()
  }

  // Handle editing a company
  const handleEditCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedCompanies = companies.map((company) =>
      company.id === selectedCompanyId ? { ...company, ...formData, id: selectedCompanyId } : company,
    )

    setCompanies(updatedCompanies)
    setIsEditCompanyOpen(false)
  }

  // Handle deleting a company
  const handleDeleteCompany = () => {
    if (companyToDelete) {
      const updatedCompanies = companies.filter((company) => company.id !== companyToDelete)
      setCompanies(updatedCompanies)

      if (selectedCompanyId === companyToDelete && updatedCompanies.length > 0) {
        setSelectedCompanyId(updatedCompanies[0].id)
      }

      setCompanyToDelete(null)
    }
  }

  // Handle updating events for a company
  const handleUpdateEvents = (events: TimelineEvent[]) => {
    const updatedCompanies = companies.map((company) =>
      company.id === selectedCompanyId ? { ...company, events } : company,
    )

    setCompanies(updatedCompanies)
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      founded: "",
      founder: "",
      headquarters: "",
      employees: "",
      revenue: "",
      description: "",
      keyAchievements: [""],
    })
  }

  // Load company data for editing
  const loadCompanyForEdit = () => {
    if (selectedCompany) {
      setFormData({
        id: selectedCompany.id,
        name: selectedCompany.name,
        founded: selectedCompany.founded,
        founder: selectedCompany.founder,
        headquarters: selectedCompany.headquarters,
        employees: selectedCompany.employees,
        revenue: selectedCompany.revenue,
        description: selectedCompany.description,
        keyAchievements: [...selectedCompany.keyAchievements],
      })
      setIsEditCompanyOpen(true)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle key achievement changes
  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...formData.keyAchievements]
    updatedAchievements[index] = value
    setFormData((prev) => ({ ...prev, keyAchievements: updatedAchievements }))
  }

  // Add a new achievement field
  const addAchievementField = () => {
    setFormData((prev) => ({
      ...prev,
      keyAchievements: [...prev.keyAchievements, ""],
    }))
  }

  // Remove an achievement field
  const removeAchievementField = (index: number) => {
    if (formData.keyAchievements.length > 1) {
      const updatedAchievements = formData.keyAchievements.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, keyAchievements: updatedAchievements }))
    }
  }

  const dialogBgClass =
    theme === "dark" ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"

  const inputBgClass = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"

  return (
    <div className="space-y-8">
      {/* Company selector and management */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <CompanySelector
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={handleCompanySelect}
        />

        <div className="flex gap-2">
          <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/20 dark:shadow-purple-600/30 hover-lift">
                <Plus size={18} className="mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[600px] ${dialogBgClass} transition-colors duration-300`}>
              <DialogHeader>
                <DialogTitle className="neon-gradient-text">Add New Company</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCompany} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input
                      id="founded"
                      name="founded"
                      value={formData.founded}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founder">Founder(s)</Label>
                    <Input
                      id="founder"
                      name="founder"
                      value={formData.founder}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headquarters">Headquarters</Label>
                    <Input
                      id="headquarters"
                      name="headquarters"
                      value={formData.headquarters}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Employees</Label>
                    <Input
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Revenue</Label>
                    <Input
                      id="revenue"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleInputChange}
                      required
                      className={inputBgClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className={inputBgClass}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Key Achievements</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAchievementField}
                      className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
                    >
                      <Plus size={16} className="mr-1" /> Add Achievement
                    </Button>
                  </div>

                  {formData.keyAchievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, e.target.value)}
                        className={inputBgClass}
                        placeholder={`Achievement ${index + 1}`}
                      />
                      {formData.keyAchievements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAchievementField(index)}
                          className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-red-900/50" : "bg-gray-100 border-gray-200 hover:bg-red-100"} transition-colors duration-300`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gapp-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddCompanyOpen(false)
                      resetForm()
                    }}
                    className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover-lift"
                  >
                    Add Company
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {companies.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={loadCompanyForEdit}
                className={`${theme === "dark" ? "bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700" : "bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-gray-100"} transition-colors duration-300 hover-lift`}
              >
                <Edit size={18} className="mr-2" />
                Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${theme === "dark" ? "bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-red-900/50" : "bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-red-100"} transition-colors duration-300 hover-lift`}
                    onClick={() => setCompanyToDelete(selectedCompanyId)}
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className={dialogBgClass}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="neon-text-purple">Delete Company</AlertDialogTitle>
                    <AlertDialogDescription className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      Are you sure you want to delete "{selectedCompany?.name}"? This will permanently remove the
                      company and all its timeline events.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white hover-lift"
                      onClick={handleDeleteCompany}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Edit company dialog */}
      <Dialog open={isEditCompanyOpen} onOpenChange={setIsEditCompanyOpen}>
        <DialogContent className={`sm:max-w-[600px] ${dialogBgClass} transition-colors duration-300`}>
          <DialogHeader>
            <DialogTitle className="neon-gradient-text">Edit Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditCompany} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Company Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-founded">Founded Year</Label>
                <Input
                  id="edit-founded"
                  name="founded"
                  value={formData.founded}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-founder">Founder(s)</Label>
                <Input
                  id="edit-founder"
                  name="founder"
                  value={formData.founder}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-headquarters">Headquarters</Label>
                <Input
                  id="edit-headquarters"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employees">Employees</Label>
                <Input
                  id="edit-employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-revenue">Revenue</Label>
                <Input
                  id="edit-revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  required
                  className={inputBgClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className={inputBgClass}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Key Achievements</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAchievementField}
                  className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
                >
                  <Plus size={16} className="mr-1" /> Add Achievement
                </Button>
              </div>

              {formData.keyAchievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    className={inputBgClass}
                    placeholder={`Achievement ${index + 1}`}
                  />
                  {formData.keyAchievements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeAchievementField(index)}
                      className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-red-900/50" : "bg-gray-100 border-gray-200 hover:bg-red-100"} transition-colors duration-300`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditCompanyOpen(false)}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover-lift"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Company info and timeline */}
      {companies.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCompanyId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <CompanyInfo company={selectedCompany} />

            <h2 className="text-3xl font-bold text-center mt-12 mb-6 neon-gradient-text">
              {selectedCompany.name} Timeline
            </h2>

            <Timeline timelineData={selectedCompany.events} onUpdateEvents={(events) => handleUpdateEvents(events)} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium mb-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">
            No companies added yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6 transition-colors duration-300">
            Add your first company to get started
          </p>
          <Button
            onClick={() => setIsAddCompanyOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover-lift"
          >
            <Plus size={18} className="mr-2" />
            Add Company
          </Button>
        </div>
      )}
    </div>
  )
}

