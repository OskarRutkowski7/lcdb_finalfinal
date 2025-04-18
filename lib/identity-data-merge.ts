import type { Sinner } from "./identity-data"
import baseSinnerData from "./identity-data"
import additionalSinnerData from "./identity-data-additional"

// Function to get all sinner data by merging the base and additional data
export function getAllSinnerData(): Record<number, Sinner> {
  // Merge the base and additional data
  return {
    ...baseSinnerData,
    ...additionalSinnerData,
  }
}

// Function to get a specific sinner by ID
export function getSinnerByIdMerged(id: number): Sinner | undefined {
  const allData = getAllSinnerData()
  return allData[id]
}
