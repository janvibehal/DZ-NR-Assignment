"use client";

import { useState } from "react";

const categories = ["All", "Tech", "Design", "AI", "Web Dev", "Content", "Startups"];
const sortOptions = ["Trending", "Most Followers", "Recently Active"];

export default function Filters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [selectedSort, setSelectedSort] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      // If "All" is clicked, select only "All"
      setSelectedCategories(["All"]);
    } else {
      // Remove "All" if another category is selected
      const newCategories = selectedCategories.filter((c) => c !== "All");
      
      if (selectedCategories.includes(category)) {
        // Deselect the category
        const updated = newCategories.filter((c) => c !== category);
        // If nothing selected, default to "All"
        setSelectedCategories(updated.length === 0 ? ["All"] : updated);
      } else {
        // Select the category
        setSelectedCategories([...newCategories, category]);
      }
    }
  };

  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category);
  };

  return (
    <div className="bg-black/80 backdrop-blur-xl border-b border-neutral-800 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search creators by name or niche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Pills - MULTI-SELECT */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = isCategorySelected(category);
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
                        : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {isSelected && category !== "All" && (
                      <span className="inline-flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {category}
                      </span>
                    )}
                    {!isSelected && category}
                    {isSelected && category === "All" && category}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="relative z-50">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm font-medium hover:bg-neutral-800 transition-all min-w-[180px] justify-between"
              >
                <span>{selectedSort}</span>
                <svg
                  className={`w-4 h-4 text-neutral-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-[180px] bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-all ${
                          selectedSort === option
                            ? "bg-orange-500/10 text-orange-400 font-medium"
                            : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Active Filters Count */}
          {selectedCategories.length > 0 && !selectedCategories.includes("All") && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500">
                {selectedCategories.length} {selectedCategories.length === 1 ? "filter" : "filters"} active
              </span>
              <button
                onClick={() => setSelectedCategories(["All"])}
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}