"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { TimelineEvent as TimelineEventType } from "@/components/timeline-explorer";
import { useTheme } from "@/components/theme-provider";

interface TimelineEventProps {
  event: TimelineEventType;
  position: number;
  isEven: boolean;
  index: number;
}

export default function TimelineEvent({
  event,
  position,
  isEven,
  index,
}: TimelineEventProps) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Format the date
  const formattedDate = format(new Date(event.date), "MMM d, yyyy");

  const cardBgClass =
    theme === "dark"
      ? "bg-gray-800/90 backdrop-blur-sm border-gray-700"
      : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg";

  const dialogBgClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800 text-white"
      : "bg-white border-gray-200 text-gray-900";

  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <>
      <motion.div
        className="absolute"
        style={{
          left: `${position}%`,
          top: isEven ? "0" : "60%",
          transform: "translate(-50%, 0)",
        }}
        initial={{ opacity: 0, y: isEven ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {/* Timeline dot */}
        <motion.div
          className={cn(
            "w-5 h-5 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 border-2 border-white dark:border-gray-800",
            `bg-gradient-to-r ${event.color}`
          )}
          style={{
            top: isEven ? "100%" : "-20%",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05 + 0.2,
            type: "spring",
            stiffness: 300,
          }}
          whileHover={{
            scale: 1.5,
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)",
          }}
        />

        {/* Event card */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              className={cn(
                `w-64 ${cardBgClass} rounded-lg overflow-hidden cursor-pointer transition-colors duration-300`,
                isHovered &&
                  "ring-2 ring-offset-2 ring-offset-gray-900 dark:ring-offset-gray-900 light:ring-offset-white",
                `ring-gradient-to-r ${event.color}`
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)",
                transition: { duration: 0.2 },
              }}
              style={{
                marginBottom: isEven ? "40px" : "0",
                marginTop: isEven ? "0" : "40px",
              }}
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2} // Prioritize loading first two images
                />
                <div
                  className={cn(
                    "absolute inset-0 opacity-70",
                    `bg-gradient-to-br ${event.color}`
                  )}
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    theme === "dark"
                      ? "bg-gray-900/80 hover:bg-gray-900/80"
                      : "bg-white/80 text-gray-800 hover:bg-white/80"
                  }`}
                >
                  {formattedDate}
                </Badge>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {event.title}
                </h3>
                <p
                  className={`${textClass} text-sm line-clamp-3 transition-colors duration-300`}
                >
                  {event.description}
                </p>

                {/* Expanded content on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className={`mt-3 pt-3 border-t ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    } transition-colors duration-300`}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-gradient-to-r bg-clip-text text-transparent font-medium",
                        event.color
                      )}
                    >
                      {event.category}
                    </Badge>
                    <p
                      className={`mt-2 text-sm ${textClass} transition-colors duration-300`}
                    >
                      {event.description}
                    </p>
                    <p className="mt-2 text-xs text-purple-400 dark:text-purple-400 light:text-purple-600 transition-colors duration-300">
                      Click for more details
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </DialogTrigger>

          <DialogContent
            className={`sm:max-w-[600px] ${dialogBgClass} transition-colors duration-300`}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl neon-gradient-text">
                {event.title}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 opacity-50",
                    `bg-gradient-to-br ${event.color}`
                  )}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t ${
                    theme === "dark" ? "from-gray-900" : "from-gray-800"
                  } to-transparent`}
                >
                  <Badge
                    className={
                      theme === "dark"
                        ? "bg-gray-900/80 hover:bg-gray-900/80"
                        : "bg-white/80 text-gray-800 hover:bg-white/80"
                    }
                  >
                    {formattedDate}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-2 bg-gradient-to-r bg-clip-text text-transparent font-medium",
                      event.color
                    )}
                  >
                    {event.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <p className={textClass}>{event.description}</p>
                {event.details && (
                  <div className={`space-y-3 ${textClass}`}>
                    {event.details.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
}
