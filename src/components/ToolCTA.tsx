interface ToolCTAProps {
  href: string
  toolName: string
}

export default function ToolCTA({ href, toolName }: ToolCTAProps) {
  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgb(0, 160, 133) 0%, rgb(0, 120, 100) 100%)',
      }}
    >
      {/* Accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, rgb(128, 72, 245), rgb(0, 201, 167))',
        }}
      />

      <div className="px-8 py-10 text-center relative">
        {/* Decorative glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top right, rgb(128, 72, 245) 0%, transparent 60%)',
          }}
        />

        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white opacity-70">
          Free Tool
        </p>
        <h3 className="text-2xl font-bold text-white leading-tight mb-2">
          Try the {toolName}
        </h3>
        <p className="text-base mb-8 text-white opacity-70">
          No sign-up required. Results in seconds.
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full font-bold text-base px-8 py-3 transition-all hover:scale-105"
          style={{
            backgroundColor: 'white',
            color: 'rgb(0, 140, 115)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          Use the Free Tool →
        </a>
      </div>
    </div>
  )
}
