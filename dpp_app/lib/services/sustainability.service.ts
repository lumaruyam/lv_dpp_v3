import sustainabilityDataArray from "@/app/data/sustainability.json"
import { getTotalCarbonSaved } from "./repair.service"

export interface EnvironmentalImpact {
  totalCarbonFootprint: number
  carbonSavedByRepairs: number
  adjustedCarbonFootprint: number
  ownershipDurationYears: number
  dailyImpactGrams: number
  comparisonVsFastFashion: number
}

export function calculateEnvironmentalImpact(productId: string, ownershipStartDate: string): EnvironmentalImpact {
  // Find the sustainability data for this product, or fall back to the first entry
  const sustainabilityData = sustainabilityDataArray.find(s => s.productId === productId) || sustainabilityDataArray[0]
  const baseCarbonFootprint = sustainabilityData?.environmentalImpact?.carbonFootprintKgCO2e || 14.8

  // Calculate ownership duration
  const startDate = new Date(ownershipStartDate)
  const now = new Date()
  const durationDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const durationYears = durationDays / 365

  // Calculate carbon saved by repairs
  const carbonSavedByRepairs = getTotalCarbonSaved(productId)

  // Adjusted carbon footprint
  const adjustedCarbonFootprint = Math.max(0, baseCarbonFootprint - carbonSavedByRepairs)

  // Daily impact
  const dailyImpactGrams = durationDays > 0 ? (adjustedCarbonFootprint / durationDays) * 1000 : 0

  // Fast fashion comparison (assumes 5 replacements over 10 years at 24.8 kg CO₂/year)
  const fastFashionTotal = 24.8 * Math.max(durationYears, 1)
  const lvTotal = adjustedCarbonFootprint / Math.max(durationYears, 1)
  const comparisonVsFastFashion = Math.round(((fastFashionTotal - lvTotal) / fastFashionTotal) * 100)

  return {
    totalCarbonFootprint: baseCarbonFootprint,
    carbonSavedByRepairs,
    adjustedCarbonFootprint,
    ownershipDurationYears: durationYears,
    dailyImpactGrams,
    comparisonVsFastFashion,
  }
}

// Export object for backward compatibility
export const SustainabilityService = {
  calculateEnvironmentalImpact,
}
