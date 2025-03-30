import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import { useState } from "react"

const Filter: React.FC = () => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  return (
    <div className="bg-primary text-secondary py-4">
      <div className="vogue-container">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center justify-between w-full"
        >
          <span className="text-xl font-semibold">Filters</span>
          <ChevronDownIcon
            className={`w-6 h-6 transition-transform ${
              isFilterExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isFilterExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <div>
                <label htmlFor="location" className="block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 bg-secondary text-primary rounded"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label htmlFor="sort" className="block mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  className="w-full px-3 py-2 bg-secondary text-primary rounded"
                >
                  <option value="distance">Distance</option>
                  <option value="rate">Rate</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Type</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Full Service</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Sexual Massage</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Pure Massage</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Filter
