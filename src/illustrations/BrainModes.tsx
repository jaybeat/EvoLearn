export const BrainModes = () => (
  <svg
    viewBox="0 0 800 600"
    className="w-full h-auto"
    style={{ background: '#FFFCF0' }}
    role="img"
    aria-label="Two brain modes"
  >
    <defs>
      <linearGradient id="brainBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A6DBF7" />
        <stop offset="100%" stopColor="#5FB3EE" />
      </linearGradient>
    </defs>

    {/* Brain outline */}
    <g transform="translate(400 300)">
      <path
        d="M -180 -40 Q -200 -120 -120 -160 Q -60 -200 0 -180 Q 60 -200 120 -160 Q 200 -120 180 -40 Q 200 60 120 120 Q 60 160 0 140 Q -60 160 -120 120 Q -200 60 -180 -40 Z"
        fill="url(#brainBlue)"
        stroke="#3A8FCB"
        strokeWidth="3"
      />
      {/* Hemisphere divider */}
      <path d="M 0 -180 Q -10 -100 0 0 Q 10 100 0 140" stroke="#3A8FCB" strokeWidth="2.5" fill="none" />
      {/* Wrinkles */}
      <g stroke="#3A8FCB" strokeWidth="1.6" fill="none" opacity="0.6">
        <path d="M -160 -40 Q -120 -60 -80 -40 Q -40 -20 -20 -40" />
        <path d="M -140 20 Q -100 0 -60 20 Q -20 40 -20 20" />
        <path d="M -150 80 Q -100 60 -60 80" />
        <path d="M 20 -40 Q 60 -60 100 -40 Q 140 -20 160 -40" />
        <path d="M 20 20 Q 60 0 100 20 Q 140 40 150 20" />
        <path d="M 30 80 Q 70 60 110 80" />
      </g>
    </g>

    {/* Labels */}
    <g fontFamily="Inter, sans-serif" fontSize="22" fill="#332b22" fontWeight="600">
      <text x="120" y="120" textAnchor="middle">专注</text>
      <text x="680" y="120" textAnchor="middle">发散</text>
    </g>
    <g stroke="#7c715f" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
      <line x1="120" y1="135" x2="240" y2="240" />
      <line x1="680" y1="135" x2="560" y2="240" />
    </g>

    {/* Bottom subtitle */}
    <text
      x="400"
      y="540"
      textAnchor="middle"
      fontFamily="Young Serif, serif"
      fontSize="20"
      fill="#7c715f"
    >
      左右脑并不是简单的"理性 / 感性",而是两种思维节奏的切换
    </text>
  </svg>
);
