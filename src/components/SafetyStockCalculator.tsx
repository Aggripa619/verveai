'use client'

import { useState, useEffect, useMemo } from 'react'

const Z_SCORES: Record<string, number> = {
  '90': 1.28,
  '95': 1.645,
  '97.5': 1.96,
  '99': 2.33,
}

type ServiceLevel = '90' | '95' | '97.5' | '99'
type GateState = 'idle' | 'loading' | 'error'

const STORAGE_KEY = 'ssc_unlocked'

export default function SafetyStockCalculator() {
  // Gate state
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [gateState, setGateState] = useState<GateState>('idle')
  const [gateError, setGateError] = useState('')

  // Calculator inputs
  const [avgDemand, setAvgDemand] = useState('')
  const [stdDev, setStdDev] = useState('')
  const [leadTime, setLeadTime] = useState('')
  const [serviceLevel, setServiceLevel] = useState<ServiceLevel>('95')

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true)
    }
  }, [])

  // Derived result
  const result = useMemo(() => {
    const d = parseFloat(avgDemand)
    const s = parseFloat(stdDev)
    const l = parseFloat(leadTime)
    const z = Z_SCORES[serviceLevel]
    if ([d, s, l].some(isNaN) || d <= 0 || s < 0 || l <= 0) return null
    const safetyStock = Math.ceil(z * s * Math.sqrt(l))
    const reorderPoint = Math.round(d * l) + safetyStock
    return { safetyStock, reorderPoint, z, d, s, l }
  }, [avgDemand, stdDev, leadTime, serviceLevel])

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGateState('loading')
    setGateError('')
    try {
      const res = await fetch('/api/dl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          toolSlug: 'safety-stock-calculator',
          toolName: 'Safety Stock Calculator',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGateState('error')
        setGateError(data.error || 'Something went wrong. Please try again.')
        return
      }
      // Fire GA4 event
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'email_gate_submit',
          tool_slug: 'safety-stock-calculator',
          tool_name: 'Safety Stock Calculator',
        })
      }
      localStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
    } catch {
      setGateState('error')
      setGateError('Network error. Please try again.')
    }
  }

  if (!unlocked) {
    return (
      <div className="my-10 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
        {/* Gradient top bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(to right, rgb(0, 201, 167), rgb(128, 72, 245))' }}
        />

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {/* Label */}
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgb(0, 201, 167)' }}
          >
            Free Interactive Calculator
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Safety Stock Calculator
          </h3>
          <p className="text-sm mb-8" style={{ color: 'rgb(160, 174, 210)' }}>
            Enter your demand data and get your safety stock and reorder point instantly.
          </p>

          {/* Blurred preview of the calculator */}
          <div
            className="rounded-xl p-5 mb-8 pointer-events-none select-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              filter: 'blur(3px)',
              opacity: 0.45,
            }}
            aria-hidden="true"
          >
            <div className="grid grid-cols-2 gap-4">
              {['Average Daily Demand', 'Std Dev of Demand', 'Lead Time (days)', 'Service Level'].map((label) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
                  <div className="h-10 rounded-lg bg-white/10" />
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg h-20 bg-white/10" />
          </div>

          {/* Email gate form */}
          <form onSubmit={handleGateSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ssc-name" className="block text-xs font-medium mb-1" style={{ color: 'rgb(160, 174, 210)' }}>
                  First name
                </label>
                <input
                  id="ssc-name"
                  type="text"
                  placeholder="Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
                />
              </div>
              <div>
                <label htmlFor="ssc-email" className="block text-xs font-medium mb-1" style={{ color: 'rgb(160, 174, 210)' }}>
                  Work email <span style={{ color: 'rgb(0, 201, 167)' }}>*</span>
                </label>
                <input
                  id="ssc-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
                />
              </div>
            </div>

            {gateError && (
              <p className="text-sm text-red-400">{gateError}</p>
            )}

            <button
              type="submit"
              disabled={gateState === 'loading'}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, rgb(0, 201, 167), rgb(128, 72, 245))' }}
            >
              {gateState === 'loading' ? 'Unlocking…' : 'Get Free Access →'}
            </button>

            <p className="text-xs text-center" style={{ color: 'rgb(120, 134, 170)' }}>
              No spam. Unsubscribe any time.
            </p>
          </form>
        </div>
      </div>
    )
  }

  // ── Unlocked calculator ──────────────────────────────────────────────────────
  return (
    <div className="my-10 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
      {/* Gradient top bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: 'linear-gradient(to right, rgb(0, 201, 167), rgb(128, 72, 245))' }}
      />

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'rgb(0, 201, 167)' }}
        >
          Interactive Calculator
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Safety Stock Calculator</h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="ssc-avg-demand" className="block text-sm font-medium text-gray-700 mb-1">
              Average daily demand (units)
            </label>
            <input
              id="ssc-avg-demand"
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 25"
              value={avgDemand}
              onChange={(e) => setAvgDemand(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="ssc-std-dev" className="block text-sm font-medium text-gray-700 mb-1">
              Std dev of daily demand (units)
            </label>
            <input
              id="ssc-std-dev"
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 8"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="ssc-lead-time" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier lead time (days)
            </label>
            <input
              id="ssc-lead-time"
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 14"
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="ssc-service-level" className="block text-sm font-medium text-gray-700 mb-1">
              Target service level
            </label>
            <select
              id="ssc-service-level"
              value={serviceLevel}
              onChange={(e) => setServiceLevel(e.target.value as ServiceLevel)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            >
              <option value="90">90% — Low buffer</option>
              <option value="95">95% — Standard (recommended)</option>
              <option value="97.5">97.5% — High protection</option>
              <option value="99">99% — Maximum protection</option>
            </select>
          </div>
        </div>

        {/* Formula substitution */}
        {result ? (
          <>
            <div className="rounded-lg px-5 py-4 mb-6 font-mono text-sm" style={{ backgroundColor: 'rgb(245, 247, 250)' }}>
              <p className="text-gray-500 text-xs mb-1 font-sans">Formula used</p>
              <p className="text-gray-800">
                SS = {result.z} × {result.s} × √{result.l} ={' '}
                <span className="font-bold" style={{ color: 'rgb(0, 201, 167)' }}>
                  {result.safetyStock} units
                </span>
              </p>
              <p className="text-gray-800 mt-1">
                ROP = ({result.d} × {result.l}) + {result.safetyStock} ={' '}
                <span className="font-bold" style={{ color: 'rgb(128, 72, 245)' }}>
                  {result.reorderPoint} units
                </span>
              </p>
            </div>

            {/* Result cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Safety Stock */}
              <div
                className="rounded-xl px-5 py-5 text-center"
                style={{ backgroundColor: 'rgba(0, 201, 167, 0.08)', border: '1px solid rgba(0, 201, 167, 0.2)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgb(0, 201, 167)' }}>
                  Safety Stock
                </p>
                <p className="text-3xl font-extrabold text-gray-900">{result.safetyStock}</p>
                <p className="text-xs text-gray-500 mt-1">units to hold as buffer</p>
              </div>

              {/* Reorder Point */}
              <div
                className="rounded-xl px-5 py-5 text-center"
                style={{ backgroundColor: 'rgba(128, 72, 245, 0.08)', border: '1px solid rgba(128, 72, 245, 0.2)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgb(128, 72, 245)' }}>
                  Reorder Point
                </p>
                <p className="text-3xl font-extrabold text-gray-900">{result.reorderPoint}</p>
                <p className="text-xs text-gray-500 mt-1">units — trigger a PO here</p>
              </div>

              {/* Z-Score */}
              <div
                className="rounded-xl px-5 py-5 text-center"
                style={{ backgroundColor: 'rgb(245, 247, 250)', border: '1px solid rgb(229, 231, 235)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gray-500">
                  Z-Score Used
                </p>
                <p className="text-3xl font-extrabold text-gray-900">{result.z}</p>
                <p className="text-xs text-gray-500 mt-1">{serviceLevel}% service level</p>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl px-5 py-10 text-center" style={{ backgroundColor: 'rgb(245, 247, 250)' }}>
            <p className="text-sm text-gray-400">Enter your values above to calculate safety stock.</p>
          </div>
        )}
      </div>
    </div>
  )
}
