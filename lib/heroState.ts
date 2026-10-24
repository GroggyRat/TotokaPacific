// Shared, mutable hero state read every frame by the globe (no React renders).
export const heroState = {
  scroll: 0, // 0 → 1 across the pinned hero
  introAt: -1, // clock time (s) when the intro started; -1 = not yet
  pointer: { x: 0, y: 0 }, // -1 → 1
  drag: 0, // accumulated drag yaw (radians)
  dragging: false,
};
