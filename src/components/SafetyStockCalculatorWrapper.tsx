'use client'

import dynamic from 'next/dynamic'

const SafetyStockCalculator = dynamic(
  () => import('@/components/SafetyStockCalculator'),
  { ssr: false }
)

export default function SafetyStockCalculatorWrapper() {
  return <SafetyStockCalculator />
}
