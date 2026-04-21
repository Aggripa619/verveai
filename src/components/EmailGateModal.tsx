'use client'

import { useState, useEffect, useRef } from 'react'

interface EmailGateModalProps {
  toolSlug: string
  toolName: string
  onClose: () => void
}

type State = 'idle' | 'loading' | 'success' | 'error'

export default function EmailGateModal({ toolSlug, toolName, onClose }: EmailGateModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const res = await fetch('/api/dl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, toolSlug, toolName }),
    })

    const data = await res.json()

    if (!res.ok) {
      setState('error')
      setErrorMsg(data.error || 'Something went wrong.')
      return
    }

    setState('success')
    setTimeout(() => {
      window.open(data.redirectUrl, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Top gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, rgb(0, 201, 167), rgb(128, 72, 245))' }}
        />

        <div className="px-8 py-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          {state === 'success' ? (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ backgroundColor: 'rgba(0, 201, 167, 0.12)' }}
              >
                ✓
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Opening your template…</h2>
              <p className="text-gray-500 text-sm">
                Your free {toolName} is opening in a new tab.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'rgb(0, 201, 167)' }}
                >
                  Free Template
                </p>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  Get the {toolName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Enter your email and we'll send it straight through.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="modal-name">
                    First name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="modal-email">
                    Email address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="modal-email"
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': 'rgb(0, 201, 167)' } as React.CSSProperties}
                  />
                </div>

                {state === 'error' && (
                  <p className="text-red-500 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full rounded-full font-semibold text-white py-3 text-sm transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
                  style={{ background: 'linear-gradient(135deg, rgb(0, 201, 167), rgb(0, 160, 133))' }}
                >
                  {state === 'loading' ? 'Just a moment…' : 'Get Free Template →'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  No spam. Unsubscribe any time.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
