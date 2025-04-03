"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, ZoomIn, ZoomOut, Plus, ChevronLeft, ChevronRight, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
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
import TimelineEvent from "./timeline-event"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import type { TimelineEvent as TimelineEventType } from "@/components/timeline-explorer"

// Categories with their corresponding colors
const categories = [
  { id: "all", name: "All Categories", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "founding", name: "Founding", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "business", name: "Business", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "manufacturing", name: "Manufacturing", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "automotive", name: "Automotive", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "technology", name: "Technology", color: "bg-gradient-to-r from-cyan-500 to-purple-500" },
  { id: "aviation", name: "Aviation", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "leadership", name: "Leadership", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "hospitality", name: "Hospitality", color: "bg-gradient-to-r from-cyan-500 to-purple-500" },
  { id: "education", name: "Education", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "energy", name: "Energy", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "milestone", name: "Milestones", color: "bg-gradient-to-r from-cyan-500 to-purple-500" },
  { id: "product", name: "Products", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "software", name: "Software", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "hardware", name: "Hardware", color: "bg-gradient-to-r from-cyan-500 to-purple-500" },
  { id: "acquisition", name: "Acquisitions", color: "bg-gradient-to-r from-purple-500 to-blue-500" },
  { id: "innovation", name: "Innovations", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
]

interface TimelineProps {
  timelineData: TimelineEventType[]
  onUpdateEvents: (events: TimelineEventType[]) => void
}

export default function Timeline({ timelineData, onUpdateEvents }: TimelineProps) {
  const { theme } = useTheme()
  const [events, setEvents] = useState<TimelineEventType[]>(timelineData)
  const [filteredEvents, setFilteredEvents] = useState<TimelineEventType[]>(timelineData)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const [visibleCategories, setVisibleCategories] = useState<string[]>([])

  // Update events when timelineData changes
  useEffect(() => {
    setEvents(timelineData)
    setFilteredEvents(timelineData)

    // Extract unique categories from the timeline data
    const uniqueCategories = Array.from(new Set(timelineData.map((event) => event.category)))
    setVisibleCategories(uniqueCategories)
  }, [timelineData])

  // Handle timeline navigation
  const scrollTimeline = (direction: "left" | "right") => {
    if (timelineContainerRef.current) {
      const scrollAmount = timelineContainerRef.current.clientWidth * 0.5
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

      timelineContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })

      setScrollPosition(newPosition)
    }
  }

  // Filter events based on search query and category
  useEffect(() => {
    let filtered = [...events]

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          new Date(event.date).getFullYear().toString().includes(searchQuery),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((event) => event.category === activeCategory)
    }

    // Filter by selected date
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd")
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date)
        return format(eventDate, "yyyy-MM-dd") === dateString
      })
    }

    // Sort by date
    filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setFilteredEvents(filtered)
  }, [searchQuery, activeCategory, events, selectedDate])

  // Handle zoom in
  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel((prev) => prev + 0.25)
    }
  }

  // Handle zoom out
  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel((prev) => prev - 0.25)
    }
  }

  // Handle adding a new event
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newEvent: TimelineEventType = {
      id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      details: (formData.get("details") as string) || undefined,
      image: "/placeholder.svg?height=200&width=300",
      color:
        categories.find((cat) => cat.id === formData.get("category"))?.color.replace("bg-gradient-to-r ", "") ||
        "from-purple-500 to-blue-500",
    }

    const updatedEvents = [...events, newEvent]
    setEvents(updatedEvents)
    onUpdateEvents(updatedEvents)
    setIsDialogOpen(false)
    e.currentTarget.reset()
  }

  // Handle deleting an event
  const handleDeleteEvent = () => {
    if (eventToDelete !== null) {
      const updatedEvents = events.filter((event) => event.id !== eventToDelete)
      setEvents(updatedEvents)
      onUpdateEvents(updatedEvents)
      setEventToDelete(null)
    }
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setIsCalendarOpen(false)
  }

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(undefined)
  }

  const dialogBgClass =
    theme === "dark" ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"

  const inputBgClass = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"

  const controlsBgClass =
    theme === "dark"
      ? "bg-gray-800/50 backdrop-blur-sm border-gray-700"
      : "bg-white/50 backdrop-blur-sm border-gray-200"

  return (
    <div className="space-y-8">
      {/* Controls */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full md:w-64">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            size={18}
          />
          <Input
            type="text"
            placeholder="Search events..."
            className={`pl-10 ${controlsBgClass} focus:border-purple-500/50 focus:ring-purple-500/20 transition-colors duration-300`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  `${controlsBgClass} hover:bg-opacity-70 hover:text-current hover:border-purple-500/50 transition-colors duration-300 hover-lift`,
                  selectedDate && "text-purple-500 border-purple-500/50",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
              />
              {selectedDate && (
                <div className="p-3 border-t border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearDateFilter}
                    className={`w-full ${theme === "dark" ? "text-purple-400 hover:text-purple-300 hover:bg-gray-700" : "text-purple-600 hover:text-purple-700 hover:bg-gray-100"} transition-colors duration-300`}
                  >
                    Clear date filter
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="all" value={activeCategory} className="w-full md:w-auto" onValueChange={setActiveCategory}>
          <TabsList
            className={`${controlsBgClass} overflow-x-auto flex w-full md:w-auto transition-colors duration-300`}
          >
            <TabsTrigger
              key="all"
              value="all"
              className={`data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 transition-colors duration-300`}
            >
              <span className="h-2 w-2 rounded-full mr-2 bg-gradient-to-r from-purple-500 to-blue-500"></span>
              All
            </TabsTrigger>
            {categories
              .filter((cat) => visibleCategories.includes(cat.id) && cat.id !== "all")
              .map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 transition-colors duration-300`}
                >
                  <span
                    className={cn("h-2 w-2 rounded-full mr-2", category.color.replace("bg-gradient-to-r", "bg"))}
                  ></span>
                  {category.name}
                </TabsTrigger>
              ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2 w-full md:w-auto justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className={`${controlsBgClass} hover:bg-opacity-70 hover:text-current hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover-lift`}
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className={`${controlsBgClass} hover:bg-opacity-70 hover:text-current hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover-lift`}
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/20 dark:shadow-purple-600/30 hover-lift">
                <Plus size={18} className="mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[500px] ${dialogBgClass} transition-colors duration-300`}>
              <DialogHeader>
                <DialogTitle className="neon-gradient-text">Add New Timeline Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEvent} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" name="title" required className={inputBgClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${inputBgClass}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                    >
                      <CalendarComponent
                        mode="single"
                        onSelect={(date) => {
                          const input = document.createElement("input")
                          input.type = "hidden"
                          input.name = "date"
                          input.value = date ? format(date, "yyyy-MM-dd") : ""
                          document.querySelector("form")?.appendChild(input)
                        }}
                        initialFocus
                        className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger className={inputBgClass}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent
                      className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                    >
                      {categories
                        .filter((cat) => cat.id !== "all")
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              <span className={cn("h-2 w-2 rounded-full mr-2", category.color)}></span>
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    className={inputBgClass}
                    rows={2}
                    placeholder="Brief description that appears on the timeline card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Detailed Information (Optional)</Label>
                  <Textarea
                    id="details"
                    name="details"
                    className={inputBgClass}
                    rows={4}
                    placeholder="More detailed information that will appear when the event is clicked"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-100 border-gray-200 hover:bg-gray-200"} transition-colors duration-300`}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover-lift"
                  >
                    Add Event
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Timeline navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollTimeline("left")}
          className={`${controlsBgClass} hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-blue-600/80 hover:text-white hover:border-transparent z-10 transition-all duration-300 hover-lift`}
          aria-label="Scroll timeline left"
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollTimeline("right")}
          className={`${controlsBgClass} hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-blue-600/80 hover:text-white hover:border-transparent z-10 transition-all duration-300 hover-lift`}
          aria-label="Scroll timeline right"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Timeline */}
      <div
        ref={timelineContainerRef}
        className="relative overflow-x-auto pb-10 -mt-10"
        style={{
          overflowY: "hidden",
        }}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        {filteredEvents.length === 0 ? (
          <motion.div
            className={`text-center py-20 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Filter className="mx-auto mb-4 h-12 w-12 opacity-20" />
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p>Try adjusting your search or filter criteria</p>
            {selectedDate && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearDateFilter}
                className={`mt-4 ${theme === "dark" ? "text-purple-400 hover:text-purple-300 hover:bg-gray-700/50" : "text-purple-600 hover:text-purple-700 hover:bg-gray-100"} transition-colors duration-300`}
              >
                Clear date filter
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            ref={timelineRef}
            className="relative transition-all duration-300 ease-in-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "left center",
              width: `${Math.max(100, 100 * Math.max(1, filteredEvents.length / 3))}%`,
              minHeight: "400px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Timeline line */}
            <motion.div
              className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full pulse-glow"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Timeline events */}
            <div className="relative">
              {filteredEvents.map((event, index) => {
                // Calculate position along the timeline (0% to 100%)
                const position = (index / (filteredEvents.length - 1 || 1)) * 100
                const isEven = index % 2 === 0

                return (
                  <div key={event.id} className="group">
                    <TimelineEvent event={event} position={position} isEven={isEven} index={index} />

                    {/* Delete button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <motion.button
                          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 shadow-lg"
                          style={{
                            left: `${position}%`,
                            top: isEven ? "40px" : "calc(60% + 40px)",
                            transform: "translate(-50%, 0)",
                            zIndex: 20,
                          }}
                          onClick={() => setEventToDelete(event.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Delete event"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className={dialogBgClass}>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="neon-text-purple">Delete Event</AlertDialogTitle>
                          <AlertDialogDescription className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
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
                            onClick={handleDeleteEvent}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

