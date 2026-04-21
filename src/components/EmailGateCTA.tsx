'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const EmailGateModal = dynamic(() => import('./EmailGateModal'), { ssr: false })

interface EmailGateCTAProps {
  toolSlug: string
  toolName: string
}

export default function EmailGateCTA({ toolSlug, toolName }: EmailGateCTAProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="not-prose my-10 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(40, 20, 80) 50%, rgb(19, 33, 68) 100%)',
        }}
      >
        {/* Accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, rgb(0, 201, 167), rgb(128, 72, 245))' }}
        />

        <div className="px-8 py-10 text-center relative">
          {/* Glow blobs */}
          <div
            className="absolute top-0 left-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgb(0, 201, 167)', transform: 'translateY(-50%)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgb(128, 72, 245)', transform: 'translateY(50%)' }}
          />

          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgb(0, 201, 167)' }}>
            Free Template
          </p>
          <h3 className="text-2xl font-bold text-white leading-tight mb-2">
            Get the {toolName}
          </h3>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Free Google Sheet — no software required.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full font-bold text-base px-8 py-3 transition-all hover:scale-105"
            style={{
              backgroundColor: 'white',
              color: 'rgb(19, 33, 68)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            Download Free Template →
          </button>

          <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            No credit card · Instant access
          </p>
        </div>
      </div>

      {open && (
        <EmailGateModal
          toolSlug={toolSlug}
          toolName={toolName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
