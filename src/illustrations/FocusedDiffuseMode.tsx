export const FocusedDiffuseMode = () => (
  <svg
    viewBox="0 0 800 600"
    className="w-full h-auto"
    style={{ background: '#FFFCF0' }}
    role="img"
    aria-label="Focused vs Diffuse Mode"
  >
    <defs>
      <radialGradient id="focusedGrad" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#7CC4F2" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#7CC4F2" stopOpacity="0.05" />
      </radialGradient>
      <radialGradient id="diffuseGrad" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#F5B26B" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#F5B26B" stopOpacity="0.05" />
      </radialGradient>
    </defs>

    {/* Left: Focused mode */}
    <g>
      <circle cx="200" cy="300" r="180" fill="url(#focusedGrad)" />
      <text x="200" y="120" textAnchor="middle" fontFamily="Young Serif, serif" fontSize="28" fill="#332b22">
        专注模式
      </text>
      <g stroke="#5FB3EE" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 120 280 L 160 290 L 200 280 L 240 295 L 280 285" />
        <path d="M 130 320 L 170 335 L 210 325 L 250 340 L 280 330" />
        <path d="M 150 360 L 190 370 L 230 365" />
      </g>
      <g fill="#5FB3EE">
        <circle cx="120" cy="280" r="5" />
        <circle cx="160" cy="290" r="5" />
        <circle cx="200" cy="280" r="6" />
        <circle cx="240" cy="295" r="5" />
        <circle cx="280" cy="285" r="5" />
        <circle cx="130" cy="320" r="5" />
        <circle cx="170" cy="335" r="5" />
        <circle cx="210" cy="325" r="5" />
        <circle cx="250" cy="340" r="5" />
        <circle cx="280" cy="330" r="5" />
        <circle cx="150" cy="360" r="5" />
        <circle cx="190" cy="370" r="5" />
        <circle cx="230" cy="365" r="5" />
      </g>
    </g>

    {/* Right: Diffuse mode */}
    <g>
      <circle cx="600" cy="300" r="180" fill="url(#diffuseGrad)" />
      <text x="600" y="120" textAnchor="middle" fontFamily="Young Serif, serif" fontSize="28" fill="#332b22">
        发散模式
      </text>
      <g stroke="#D88A3E" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeDasharray="4 4">
        <path d="M 480 250 Q 540 200 600 260 Q 660 320 720 240" />
        <path d="M 470 320 Q 540 380 620 340 Q 700 300 730 380" />
        <path d="M 510 400 Q 580 430 660 400" />
        <path d="M 500 200 Q 560 280 660 240" />
      </g>
      <g fill="#D88A3E">
        <circle cx="480" cy="250" r="4" />
        <circle cx="540" cy="200" r="4" />
        <circle cx="600" cy="260" r="5" />
        <circle cx="660" cy="320" r="4" />
        <circle cx="720" cy="240" r="4" />
        <circle cx="470" cy="320" r="4" />
        <circle cx="540" cy="380" r="4" />
        <circle cx="620" cy="340" r="5" />
        <circle cx="700" cy="300" r="4" />
        <circle cx="730" cy="380" r="4" />
        <circle cx="510" cy="400" r="4" />
        <circle cx="580" cy="430" r="4" />
        <circle cx="660" cy="400" r="4" />
      </g>
    </g>

    {/* Divider */}
    <line x1="400" y1="120" x2="400" y2="500" stroke="#E0DAC8" strokeWidth="1.5" strokeDasharray="6 6" />

    <text x="200" y="540" textAnchor="middle" fontSize="14" fill="#7c715f">
      紧密 · 集中 · 深度
    </text>
    <text x="600" y="540" textAnchor="middle" fontSize="14" fill="#7c715f">
      松散 · 远连接 · 创意
    </text>
  </svg>
);
