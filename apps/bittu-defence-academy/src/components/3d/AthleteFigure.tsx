import type { ReactNode } from 'react';

type Point = [number, number, number];

interface LimbProps {
  from: Point;
  to: Point;
  radius: number;
  material: ReactNode;
}

/** Capsule drawn between two points, with a joint sphere at each end. */
function Limb({ from, to, radius, material }: LimbProps) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dy, dz);
  const mid: Point = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2];
  const tilt = Math.atan2(dy, dx) - Math.PI / 2;
  const roll = Math.atan2(dz, Math.hypot(dx, dy));

  return (
    <group>
      <mesh position={mid} rotation-z={tilt} rotation-x={roll}>
        <capsuleGeometry args={[radius, Math.max(length - radius * 2, 0.02), 6, 16]} />
        {material}
      </mesh>
      <mesh position={from}>
        <sphereGeometry args={[radius * 1.04, 16, 16]} />
        {material}
      </mesh>
      <mesh position={to}>
        <sphereGeometry args={[radius * 1.04, 16, 16]} />
        {material}
      </mesh>
    </group>
  );
}

/**
 * Sprinting figure in profile, built from tapered capsules and joint spheres.
 * Deliberately stylised — a dark, rim-lit athlete silhouette rather than a
 * fake-photoreal model.
 */
export default function AthleteFigure() {
  const suit = <meshStandardMaterial color="#2a4134" roughness={0.36} metalness={0.45} />;
  const skin = <meshStandardMaterial color="#42604e" roughness={0.32} metalness={0.3} />;
  const shoe = <meshStandardMaterial color="#0e1813" roughness={0.45} metalness={0.55} />;

  const hip: Point = [0, 0.98, 0];
  const shoulder: Point = [-0.07, 1.46, 0];
  const head: Point = [-0.17, 1.63, 0.01];

  // lead leg, knee driven up and forward
  const leadKnee: Point = [-0.31, 1.04, 0.1];
  const leadAnkle: Point = [-0.22, 0.5, 0.12];
  const leadToe: Point = [-0.36, 0.36, 0.12];

  // trail leg, extending behind after toe-off
  const trailKnee: Point = [0.24, 0.7, -0.1];
  const trailAnkle: Point = [0.48, 0.78, -0.12];
  const trailToe: Point = [0.6, 0.72, -0.12];

  // arms driving opposite the legs
  const leadElbow: Point = [-0.34, 1.24, 0.12];
  const leadHand: Point = [-0.22, 1.06, 0.12];
  const trailElbow: Point = [0.16, 1.2, -0.12];
  const trailHand: Point = [0.32, 1.34, -0.12];

  return (
    <group position={[2.3, -0.12, -2.2]} rotation-y={-0.28} scale={1.04}>
      {/* contact shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[-0.05, 0.012, 0.05]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#050908" transparent opacity={0.5} />
      </mesh>

      {/* torso between hip and shoulder */}
      <Limb from={hip} to={shoulder} radius={0.145} material={suit} />

      {/* pelvis and chest mass */}
      <mesh position={[hip[0], hip[1] - 0.02, 0]}>
        <sphereGeometry args={[0.15, 18, 16]} />
        {suit}
      </mesh>
      <mesh position={[shoulder[0] + 0.01, shoulder[1] - 0.04, 0]} scale={[1, 0.8, 0.85]}>
        <sphereGeometry args={[0.15, 18, 16]} />
        {suit}
      </mesh>

      {/* neck and head */}
      <Limb from={[shoulder[0] - 0.02, shoulder[1], 0]} to={head} radius={0.055} material={skin} />
      <mesh position={head}>
        <sphereGeometry args={[0.125, 24, 24]} />
        {skin}
      </mesh>

      {/* legs */}
      <Limb from={hip} to={leadKnee} radius={0.105} material={suit} />
      <Limb from={leadKnee} to={leadAnkle} radius={0.082} material={suit} />
      <Limb from={leadAnkle} to={leadToe} radius={0.062} material={shoe} />

      <Limb from={hip} to={trailKnee} radius={0.105} material={suit} />
      <Limb from={trailKnee} to={trailAnkle} radius={0.082} material={suit} />
      <Limb from={trailAnkle} to={trailToe} radius={0.062} material={shoe} />

      {/* arms */}
      <Limb from={[shoulder[0] + 0.02, shoulder[1] - 0.03, 0.06]} to={leadElbow} radius={0.062} material={skin} />
      <Limb from={leadElbow} to={leadHand} radius={0.052} material={skin} />
      <Limb from={[shoulder[0] + 0.02, shoulder[1] - 0.03, -0.06]} to={trailElbow} radius={0.062} material={skin} />
      <Limb from={trailElbow} to={trailHand} radius={0.052} material={skin} />

      {/* warm key from the floodlights, cool fill, gold backlight for the rim */}
      <pointLight position={[-1.2, 2.1, 1.6]} intensity={8} distance={9} color="#f7e9c6" />
      <pointLight position={[1.1, 1.3, 1.2]} intensity={3.5} distance={7} color="#c6a45a" />
      <pointLight position={[0.4, 1.6, -1.8]} intensity={12} distance={9} color="#f3e4bd" />
    </group>
  );
}
