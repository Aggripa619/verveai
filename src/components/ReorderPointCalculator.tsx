'use client'

import { useState, useEffect, useMemo } from 'react'

type GateState = 'idle' | 'loading' | 'error'
type StockStatus = 'reorder-now' | 'approaching' | 'healthy'

const STORAGE_KEY = 'rpc_unlocked'

export default function ReorderPointCalculator() {
  // Gate state
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [gateState, setGateState] = useState<GateState>('idle')
  const [gateError, setGateError] = useState('')

  // Calculator inputs
  const [avgDemand, setAvgDemand] = useState('')
  const [leadTime, setLeadTime] = useState('')
  const [safetyStock, setSafetyStock] = useState('')
  const [currentStock, setCurrentStock] = useState('')

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true)
    }
  }, [])

  // Derived result
  const result = useMemo(() => {
    const d = parseFloat(avgDemand)
    const l = parseFloat(leadTime)
    const ss = parseFloat(safetyStock) || 0
    const cs = parseFloat(currentStock)
    if (isNaN(d) || isNaN(l) || d <= 0 || l <= 0) return null
    const rop = Math.round(d * l) + ss
    const daysUntilROP = (!isNaN(cs) && cs > 0) ? Math.max(0, Math.floor((cs - rop) / d)) : null
    const stockStatus: StockStatus | null =
      daysUntilROP === null ? null :
      daysUntilROP <= 0 ? 'reorder-now' :
      daysUntilROP <= 3 ? 'approaching' : 'healthy'
    return { rop, daysUntilROP, stockStatus, d, l, ss, cs }
  }, [avgDemand, leadTime, safetyStock, currentStock])

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
          toolSlug: 'reorder-point-calculator',
          toolName: 'Reorder Point Calculator',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGateState('error')
        setGateError(data.error || 'Something went wrong. Please try again.')
        return
      }
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'email_gate_submit',
          tool_slug: 'reorder-point-calculator',
          tool_name: 'Reorder Point Calculator',
        })
      }
      localStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
    } catch {
      setGateState('error')
      setGateError('Network error. Please try again.')
    }
  }

  // ── Locked (email gate) ──────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="my-10 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(to right, rgb(0, 201, 167), rgb(128, 72, 245))' }}
        />

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgb(0, 201, 167)' }}
          >
            Free Interactive Calculator
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Reorder Point Calculator
          </h3>
          <p className="text-sm mb-8" style={{ color: 'rgb(160, 174, 210)' }}>
            Enter your demand and lead time data to get your reorder point and days until reorder instantly.
          </p>

          {/* Blurred preview */}
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
              {['Average Daily Demand', 'Lead Time (days)', 'Safety Stock (units)', 'Current Stock (units)'].map((label) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
                  <div className="h-10 rounded-lg bg-white/10" />
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg h-20 bg-white/10" />
          </div>

          {/* Email form */}
          <form onSubmit={handleGateSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="rpc-name" className="block text-xs font-medium mb-1" style={{ color: 'rgb(160, 174, 210)' }}>
                  First name
                </label>
                <input
                  id="rpc-name"
                  type="text"
                  placeholder="Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
                />
              </div>
              <div>
                <label htmlFor="rpc-email" className="block text-xs font-medium mb-1" style={{ color: 'rgb(160, 174, 210)' }}>
                  Work email <span style={{ color: 'rgb(0, 201, 167)' }}>*</span>
                </label>
                <input
                  id="rpc-email"
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
  const statusConfig = {
    'reorder-now': { label: 'Reorder Now', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', color: 'rgb(220,38,38)' },
    'approaching': { label: 'Approaching — Order Soon', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: 'rgb(217,119,6)' },
    'healthy':     { label: 'Healthy', bg: 'rgba(0,201,167,0.08)', border: 'rgba(0,201,167,0.2)', color: 'rgb(0,201,167)' },
  }

  return (
    <div className="my-10 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
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
        <h3 className="text-xl font-bold text-gray-900 mb-6">Reorder Point Calculator</h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="rpc-avg-demand" className="block text-sm font-medium text-gray-700 mb-1">
              Average daily demand (units)
            </label>
            <input
              id="rpc-avg-demand"
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 20"
              value={avgDemand}
              onChange={(e) => setAvgDemand(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="rpc-lead-time" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier lead time (days)
            </label>
            <input
              id="rpc-lead-time"
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 10"
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="rpc-safety-stock" className="block text-sm font-medium text-gray-700 mb-1">
              Safety stock (units) <span className="text-gray-400 font-normal">— optional</span>
            </label>
            <input
              id="rpc-safety-stock"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 50 (enter 0 if none)"
              value={safetyStock}
              onChange={(e) => setSafetyStock(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label htmlFor="rpc-current-stock" className="block text-sm font-medium text-gray-700 mb-1">
              Current stock (units) <span className="text-gray-400 font-normal">— optional</span>
            </label>
            <input
              id="rpc-current-stock"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 350 (for days until reorder)"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
            />
          </div>
        </div>

        {result ? (
          <>
            {/* Formula substitution */}
            <div className="rounded-lg px-5 py-4 mb-6 font-mono text-sm" style={{ backgroundColor: 'rgb(245, 247, 250)' }}>
              <p className="text-gray-500 text-xs mb-1 font-sans">Formula used</p>
              <p className="text-gray-800">
                ROP = ({result.d} × {result.l}) + {result.ss} ={' '}
                <span className="font-bold" style={{ color: 'rgb(128, 72, 245)' }}>
                  {result.rop} units
                </span>
              </p>
              {result.daysUntilROP !== null && (
                <p className="text-gray-800 mt-1">
                  Days until ROP = ({result.cs} − {result.rop}) ÷ {result.d} ={' '}
                  <span className="font-bold" style={{ color: 'rgb(0, 201, 167)' }}>
                    {result.daysUntilROP} days
                  </span>
                </p>
              )}
            </div>

            {/* Result cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Reorder Point */}
              <div
                className="rounded-xl px-5 py-5 text-center"
                style={{ backgroundColor: 'rgba(128, 72, 245, 0.08)', border: '1px solid rgba(128, 72, 245, 0.2)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgb(128, 72, 245)' }}>
                  Reorder Point
                </p>
                <p className="text-3xl font-extrabold text-gray-900">{result.rop}</p>
                <p className="text-xs text-gray-500 mt-1">units — place order here</p>
              </div>

              {/* Safety Stock Used */}
              <div
                className="rounded-xl px-5 py-5 text-center"
                style={{ backgroundColor: 'rgba(0, 201, 167, 0.08)', border: '1px solid rgba(0, 201, 167, 0.2)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgb(0, 201, 167)' }}>
                  Safety Stock
                </p>
                <p className="text-3xl font-extrabold text-gray-900">{result.ss}</p>
                <p className="text-xs text-gray-500 mt-1">units buffer included</p>
              </div>

              {/* Days Until Reorder or Lead Time Coverage */}
              {result.daysUntilROP !== null ? (
                <div
                  className="rounded-xl px-5 py-5 text-center"
                  style={{
                    backgroundColor: statusConfig[result.stockStatus!].bg,
                    border: `1px solid ${statusConfig[result.stockStatus!].border}`,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: statusConfig[result.stockStatus!].color }}
                  >
                    Stock Status
                  </p>
                  <p className="text-3xl font-extrabold text-gray-900">{result.daysUntilROP}d</p>
                  <p className="text-xs mt-1" style={{ color: statusConfig[result.stockStatus!].color }}>
                    {statusConfig[result.stockStatus!].label}
                  </p>
                </div>
              ) : (
                <div
                  className="rounded-xl px-5 py-5 text-center"
                  style={{ backgroundColor: 'rgb(245, 247, 250)', border: '1px solid rgb(229, 231, 235)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gray-500">
                    Lead Time Cover
                  </p>
                  <p className="text-3xl font-extrabold text-gray-900">{result.l}d</p>
                  <p className="text-xs text-gray-500 mt-1">days of demand covered</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-xl px-5 py-10 text-center" style={{ backgroundColor: 'rgb(245, 247, 250)' }}>
            <p className="text-sm text-gray-400">Enter your average daily demand and lead time to calculate your reorder point.</p>
          </div>
        )}
      </div>
    </div>
  )
}
