import repairsData from "@/app/data/repairs.json"

export interface Repair {
  repairId: string
  productId: string
  ownerId: string
  repairType: string
  status: string
  date: string
  notes: string
  carbonSavedKg: number
  completedBy: string
}

export function getRepairsByProduct(productId: string): Repair[] {
  return repairsData.filter((repair) => repair.productId === productId)
}

export function getRepairsByOwner(ownerId: string): Repair[] {
  return repairsData.filter((repair) => repair.ownerId === ownerId)
}

export function getTotalCarbonSaved(productId: string): number {
  const repairs = getRepairsByProduct(productId)
  return repairs.reduce((total, repair) => total + repair.carbonSavedKg, 0)
}

export function getRepairCount(productId: string): number {
  return getRepairsByProduct(productId).length
}

// Export class for backward compatibility
export const RepairService = {
  getRepairsByProduct,
  getRepairsByOwner,
  getTotalCarbonSaved,
  getRepairCount,
}
