export const DeepLearningCycle = () => (
  <svg
    viewBox="0 0 800 600"
    className="w-full h-auto"
    style={{ background: '#FFFCF0' }}
    role="img"
    aria-label="Deep learning cycle"
  >
    <defs>
      <marker id="arrowDL" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#5FB3EE" />
      </marker>
    </defs>

    {/* Outer cycle */}
    <circle cx="400" cy="300" r="220" fill="none" stroke="#E0DAC8" strokeWidth="2" strokeDasharray="6 6" />

    {/* Three nodes */}
    <g>
      <g transform="translate(400 80)">
        <circle r="60" fill="#7CC4F2" stroke="#3A8FCB" strokeWidth="3" />
        <text textAnchor="middle" y="-4" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#fff">
          专注
        </text>
        <text textAnchor="middle" y="22" fontFamily="Inter, sans-serif" fontSize="11" fill="#fff" opacity="0.85">
          解决具体问题
        </text>
      </g>

      <g transform="translate(640 420)">
        <circle r="60" fill="#F5B26B" stroke="#D88A3E" strokeWidth="3" />
        <text textAnchor="middle" y="-4" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#fff">
          发散
        </text>
        <text textAnchor="middle" y="22" fontFamily="Inter, sans-serif" fontSize="11" fill="#fff" opacity="0.85">
          建立远连接
        </text>
      </g>

      <g transform="translate(160 420)">
        <circle r="60" fill="#A6DBF7" stroke="#5FB3EE" strokeWidth="3" />
        <text textAnchor="middle" y="-4" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#332b22">
          巩固
        </text>
        <text textAnchor="middle" y="22" fontFamily="Inter, sans-serif" fontSize="11" fill="#332b22" opacity="0.7">
          睡眠 + 复述
        </text>
      </g>
    </g>

    {/* Arrows around the cycle */}
    <g stroke="#5FB3EE" strokeWidth="3" fill="none" markerEnd="url(#arrowDL)">
      <path d="M 470 130 A 220 220 0 0 1 580 380" />
      <path d="M 560 460 A 220 220 0 0 1 240 460" />
      <path d="M 220 380 A 220 220 0 0 1 330 130" />
    </g>

    {/* Center label */}
    <text x="400" y="290" textAnchor="middle" fontFamily="Young Serif, serif" fontSize="28" fill="#332b22">
      学习循环
    </text>
    <text x="400" y="320" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#7c715f">
      Focus → Diffuse → Consolidate
    </text>
  </svg>
);
