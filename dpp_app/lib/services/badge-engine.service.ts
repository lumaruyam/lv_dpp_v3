import badgesData from "@/app/data/badges.json"
import productDataArray from "@/app/data/product.json"
import { getRepairCount } from "./repair.service"

export interface Badge {
  id: string
  title: string
  description: string
  criteria: string
  image: string
  achieved: boolean
}

export function evaluateBadges(productId: string, ownerId: string, ownershipStartDate: string): Badge[] {
  const badges = [...badgesData]
  const repairCount = getRepairCount(productId)
  // Find the product data for this product, or fall back to the first entry
  const productData = productDataArray.find(p => p.productId === productId) || productDataArray[0]
  const craftsmanshipHours = productData?.craftsmanshipHours || 0

  // Calculate ownership duration in years
  const startDate = new Date(ownershipStartDate)
  const now = new Date()
  const yearsOwned = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)

  // Evaluate each badge
  return badges.map((badge) => {
    let achieved = badge.achieved

    // Evaluate criteria dynamically
    if (badge.id === "first-owner") {
      achieved = true // Assuming user is first owner from activation
    } else if (badge.id === "craftsmanship-heritage") {
      achieved = craftsmanshipHours >= 10
    } else if (badge.id === "sustainability-guardian") {
      achieved = repairCount >= 2
    } else if (badge.id === "three-year-steward") {
      achieved = yearsOwned >= 3
    }

    return {
      ...badge,
      achieved,
      image: badge.image,
    }
  })
}

export function getAchievedBadges(productId: string, ownerId: string, ownershipStartDate: string): Badge[] {
  return evaluateBadges(productId, ownerId, ownershipStartDate).filter((badge) => badge.achieved)
}

// Export object for backward compatibility
export const BadgeEngineService = {
  evaluateBadges,
  getAchievedBadges,
}
