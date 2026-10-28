'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm bg-white'
const ringStyle = { '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties

export default function DemoRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', storeUrl: '', platform: 'shopify', message: '', website: '' })
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setState('error')
        setErrorMsg(data.error || 'Something went wrong.')
        return
      }
      setState('success')
    } catch {
      setState('error')
      setErrorMsg('Something went wrong. Please email hello@getverveai.com instead.')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white"
          style={{ background: 'rgb(0, 201, 167)' }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks — we&apos;ll be in touch</h3>
        <p className="text-gray-500 text-sm">
          We&apos;ll email you within one business day to set up a time that suits you.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="demo-name">
            Name <span className="text-red-400">*</span>
          </label>
          <input id="demo-name" type="text" required value={form.name} onChange={set('name')}
            placeholder="Jane Smith" className={inputClass} style={ringStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="demo-email">
            Work email <span className="text-red-400">*</span>
          </label>
          <input id="demo-email" type="email" required value={form.email} onChange={set('email')}
            placeholder="jane@yourstore.com" className={inputClass} style={ringStyle} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="demo-store">
            Store URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input id="demo-store" type="text" value={form.storeUrl} onChange={set('storeUrl')}
            placeholder="yourstore.com" className={inputClass} style={ringStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="demo-platform">
            Platform
          </label>
          <select id="demo-platform" value={form.platform} onChange={set('platform')}
            className={inputClass} style={ringStyle}>
            <option value="shopify">Shopify</option>
            <option value="woocommerce">WooCommerce</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="demo-message">
          What would you like to see? <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea id="demo-message" rows={3} value={form.message} onChange={set('message')}
          placeholder="e.g. forecasting for 500 SKUs across two warehouses"
          className={inputClass} style={ringStyle} />
      </div>

      {/* Honeypot — hidden from people, filled in by form-spamming bots. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
      </div>

      {state === 'error' && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-full font-semibold text-white py-3 text-base transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
        style={{ background: 'linear-gradient(135deg, rgb(0, 201, 167), rgb(0, 160, 133))' }}
      >
        {state === 'loading' ? 'Sending…' : 'Request a Demo →'}
      </button>
      <p className="text-center text-xs text-gray-400">A 20-minute call, tailored to your store. No obligation.</p>
    </form>
  )
}
