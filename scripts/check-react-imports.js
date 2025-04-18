// This script checks for any problematic React imports
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

      // Check for React imports
      if (content.includes("from 'react'") || content.includes('from "react"')) {
        // Check for useEffectEvent in the same file
        if (content.includes("useEffectEvent") || content.includes("experimental_useEffectEvent")) {
          console.log(`Found potential issue in ${filePath}`)

          // Show the lines with React imports
          const lines = content.split("\n")
          for (let i = 0; i < lines.length; i++) {
            if (
              (lines[i].includes("from 'react'") || lines[i].includes('from "react"')) &&
              (lines[i].includes("import") || lines[i].includes("require"))
            ) {
              console.log(`  Import at line ${i + 1}: ${lines[i].trim()}`)
            }
            if (lines[i].includes("useEffectEvent") || lines[i].includes("experimental_useEffectEvent")) {
              console.log(`  useEffectEvent at line ${i + 1}: ${lines[i].trim()}`)
            }
          }
        }
      }
    }
  }
}

console.log("Checking for problematic React imports...")
searchFiles(".")
console.log("Check complete.")
