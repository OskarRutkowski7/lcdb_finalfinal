// This is a utility script to help find problematic React imports
// You can run this with Node.js to search your codebase

const fs = require("fs")
const path = require("path")

function searchFiles(dir, searchString) {
  try {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        searchFiles(filePath, searchString)
      } else if (
        stats.isFile() &&
        (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx"))
      ) {
        const content = fs.readFileSync(filePath, "utf8")
        if (content.includes(searchString)) {
          console.log(`Found "${searchString}" in ${filePath}`)

          // Print the line containing the search string for context
          const lines = content.split("\n")
          lines.forEach((line, index) => {
            if (line.includes(searchString)) {
              console.log(`  Line ${index + 1}: ${line.trim()}`)
            }
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error searching in ${dir}:`, error)
  }
}

// Search for useEffectEvent in the current directory and subdirectories
searchFiles(".", "useEffectEvent")
console.log("Search complete!")
