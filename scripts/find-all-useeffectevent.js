// This script finds all instances of useEffectEvent in the codebase
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

      // Check for any mention of useEffectEvent
      if (content.includes("useEffectEvent")) {
        console.log(`Found useEffectEvent in ${filePath}`)

        // Show the lines with useEffectEvent
        const lines = content.split("\n")
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("useEffectEvent")) {
            console.log(`  Line ${i + 1}: ${lines[i].trim()}`)
          }
        }
      }
    }
  }
}

console.log("Searching for all instances of useEffectEvent...")
searchFiles(".")
console.log("Search complete.")
