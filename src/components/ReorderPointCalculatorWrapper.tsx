'use client'

import dynamic from 'next/dynamic'

const ReorderPointCalculator = dynamic(
  () => import('@/components/ReorderPointCalculator'),
  { ssr: false }
)

export default function ReorderPointCalculatorWrapper() {
  return <ReorderPointCalculator />
}
