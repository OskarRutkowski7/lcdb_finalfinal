// This script finds all instances of useEffectEvent being imported from React
const fs = require("fs")
const path = require("path")

function searchFiles(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory() && file !== "node_modules" && file !== ".next") {
      searchFiles(filePath)
    } else if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".js")) {
      const content = fs.readFileSync(filePath, "utf8")

      // Check for imports of useEffectEvent from React
      if (
        (content.includes("useEffectEvent") && content.includes('from "react"')) ||
        (content.includes("useEffectEvent") && content.includes("from 'react'"))
      ) {
        console.log(`Found useEffectEvent import in ${filePath}`)

        // Show the line with the import
        const lines = content.split("\n")
        for (let i = 0; i < lines.length; i++) {
          if (
            (lines[i].includes("useEffectEvent") && lines[i].includes('from "react"')) ||
            (lines[i].includes("useEffectEvent") && lines[i].includes("from 'react'"))
          ) {
            console.log(`  Line ${i + 1}: ${lines[i].trim()}`)
          }
        }
      }
    }
  }
}

console.log("Searching for useEffectEvent imports from React...")
searchFiles(".")
console.log("Search complete.")
