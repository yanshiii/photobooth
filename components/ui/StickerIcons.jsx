import { Group, Circle, Path, Line, Rect } from "react-konva";

/* ================= ROTATE ICON ================= */
export function RotateIcon({ x, y, size = 14, color = "#7f1d1d" }) {
  const radius = size / 2;
  const center = radius;

  return (
    <Group x={x} y={y}>
      {/* Circular arrow path */}
      <Path
        data={`
          M ${center + radius * 0.7} ${center - radius * 0.7}
          A ${radius} ${radius} 0 1 1 ${center - radius * 0.7} ${center - radius * 0.7}
        `}
        stroke={color}
        strokeWidth={1.8}
        lineCap="round"
        lineJoin="round"
      />
      
      {/* Arrow head */}
      <Path
        data={`
          M ${center + radius * 0.7} ${center - radius * 0.7}
          L ${center + radius * 0.9} ${center - radius * 0.3}
          L ${center + radius * 0.3} ${center - radius * 0.9}
          Z
        `}
        fill={color}
      />
    </Group>
  );
}

/* ================= DELETE ICON ================= */
export function DeleteIcon({ x, y, size = 14, color = "#ffffff" }) {
  const offset = size * 0.25;
  const length = size * 0.5;

  return (
    <Group x={x} y={y}>
      {/* X shape using two lines */}
      <Line
        points={[offset, offset, offset + length, offset + length]}
        stroke={color}
        strokeWidth={2.5}
        lineCap="round"
      />
      <Line
        points={[offset + length, offset, offset, offset + length]}
        stroke={color}
        strokeWidth={2.5}
        lineCap="round"
      />
    </Group>
  );
}

/* ================= RESIZE ICON ================= */
export function ResizeIcon({ x, y, size = 8, color = "#7f1d1d" }) {
  return (
    <Group x={x} y={y}>
      {/* Corner resize indicator - small right angle */}
      <Path
        data={`
          M 0 ${size}
          L 0 0
          L ${size} 0
        `}
        stroke={color}
        strokeWidth={2}
        lineCap="round"
        lineJoin="round"
      />
      
      {/* Optional: Add small dots for grip */}
      <Circle
        x={size * 0.35}
        y={size * 0.35}
        radius={1}
        fill={color}
      />
      <Circle
        x={size * 0.65}
        y={size * 0.65}
        radius={1}
        fill={color}
      />
    </Group>
  );
}

/* ================= HANDLE BACKGROUNDS ================= */
export function HandleBackground({ x, y, radius = 11, color = "#7f1d1d", onClick, onTap }) {
  return (
    <Group x={x} y={y} onClick={onClick} onTap={onTap}>
      <Circle
        radius={radius}
        fill="#ffffff"
        stroke={color}
        strokeWidth={2}
        shadowEnabled
        shadowColor="rgba(0,0,0,0.15)"
        shadowBlur={4}
        shadowOffsetY={2}
      />
    </Group>
  );
}

export function DeleteBackground({ x, y, radius = 11, onClick, onTap }) {
  return (
    <Group x={x} y={y} onClick={onClick} onTap={onTap}>
      <Circle
        radius={radius}
        fill="#ef4444"
        stroke="#ffffff"
        strokeWidth={2}
        shadowEnabled
        shadowColor="rgba(0,0,0,0.25)"
        shadowBlur={4}
        shadowOffsetY={2}
      />
    </Group>
  );
}