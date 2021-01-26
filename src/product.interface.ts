export interface Product {
  brands: string,
  brandOwner: string,
  categories: string,
  servingSize: string,
  productName: string,
  ingredients: Ingredient[],
  numIngredients: number,
  stats: Partial<Stats>,
  servingKilograms: number,
  containsPalmOil: boolean,
  mayContainPalmOil: boolean
}

interface StatsValues {
  '5th_pct': number,
  '10th_pct': number,
  'mean': number,
  'median': number,
  '90th_pct': number,
  '95th_pct': number
}

interface Stats {
  land_use: StatsValues,
  ghg_emissions_1: StatsValues,
  ghg_emissions_2: StatsValues,
  acidifying_emissions: StatsValues
  eutrophying_emissions: StatsValues
  freshwater_withdrawals: StatsValues
  stress_weighted_water_use: StatsValues
}

interface Ingredient {
  id: string,
  text: string,
  functionUnit: number,
  stats?: unknown
}
