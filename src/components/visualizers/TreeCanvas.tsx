import { cn } from '@/lib/cn';
import type { ArrayVisualizerState, TreeVisualizerState } from '@/types/lesson-blocks';

interface TreeCanvasProps {
  state: ArrayVisualizerState | TreeVisualizerState;
}

function isTreeState(state: ArrayVisualizerState | TreeVisualizerState): state is TreeVisualizerState {
  return 'nodes' in state;
}

export function TreeCanvas({ state }: TreeCanvasProps) {
  if (!isTreeState(state)) return null;
  const { nodes, edges } = state;

  return (
    <div className="w-full flex justify-center">
      <svg viewBox="0 0 100 70" className="h-48 w-full max-w-sm">
        {/* Edges */}
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={cn(
                'transition-all duration-500',
                edge.status === 'highlighted'
                  ? 'stroke-brand stroke-[2.5]'
                  : 'stroke-border stroke-1',
              )}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="transition-all duration-500">
            <circle
              cx={node.x}
              cy={node.y}
              r={6}
              className={cn(
                'transition-all duration-500',
                node.status === 'normal' && 'fill-surface stroke-border stroke-1',
                node.status === 'highlighted' && 'fill-brand stroke-brand stroke-2',
                node.status === 'new' && 'fill-green-500 stroke-green-600 stroke-2',
              )}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={cn(
                'text-[5px] font-bold select-none transition-colors duration-500',
                node.status === 'highlighted' || node.status === 'new'
                  ? 'fill-white'
                  : 'fill-text-primary',
              )}
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
