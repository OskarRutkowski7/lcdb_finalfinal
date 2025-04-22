// This script will help identify files that might be using useEffectEvent
// Run with: node scripts/find-useEffectEvent.js

const fs = require("fs")
const path = require("path")

// Function to recursively search for files
function findFiles(dir, fileExtensions) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && file !== "node_modules" && file !== ".next") {
      // Recursively search directories
      results = results.concat(findFiles(filePath, fileExtensions))
    } else {
      // Check if file has one of the specified extensions
      const ext = path.extname(file).toLowerCase()
      if (fileExtensions.includes(ext)) {
        results.push(filePath)
      }
    }
  })

  return results
}

// Function to check if a file contains useEffectEvent
function checkForUseEffectEvent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Check for useEffectEvent
    if (content.includes("useEffectEvent")) {
      console.log(`Found useEffectEvent in: ${filePath}`)

      // Get the line number
      const lines = content.split("\n")
      lines.forEach((line, index) => {
        if (line.includes("useEffectEvent")) {
          console.log(`  Line ${index + 1}: ${line.trim()}`)
        }
      })

      return true
    }

    return false
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return false
  }
}

// Main function
function main() {
  console.log("Searching for files that might use useEffectEvent...")

  // Find all TypeScript and JavaScript files
  const files = findFiles(".", [".ts", ".tsx", ".js", ".jsx"])

  // Check each file for useEffectEvent
  let foundCount = 0
  files.forEach((file) => {
    if (checkForUseEffectEvent(file)) {
      foundCount++
    }
  })

  console.log(`Search complete. Found ${foundCount} files with useEffectEvent.`)
}

main()
