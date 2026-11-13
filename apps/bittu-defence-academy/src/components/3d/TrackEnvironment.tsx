import { AdditiveBlending, DoubleSide } from 'three';

interface TrackEnvironmentProps {
  /** Fewer beams, stands rows and lane lines on small screens. */
  mobile: boolean;
}

const FLOODLIGHT_POSITIONS: Array<[number, number]> = [
  [-22, -14],
  [22, -14],
  [-26, -34],
  [26, -34],
];

/**
 * Procedural stadium: track, infield, stepped stands and floodlight masts.
 * All geometry is primitive meshes — no model downloads, no external assets.
 */
export default function TrackEnvironment({ mobile }: TrackEnvironmentProps) {
  const lanes = mobile ? 5 : 7;
  const standRows = mobile ? 3 : 5;

  return (
    <group>
      {/* ground plane */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <planeGeometry args={[160, 220]} />
        <meshStandardMaterial color="#0d1713" roughness={1} />
      </mesh>

      {/* infield */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, -16]}>
        <planeGeometry args={[44, 80]} />
        <meshStandardMaterial color="#16241d" roughness={0.95} />
      </mesh>

      {/* track surface */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 6]}>
        <planeGeometry args={[26, 60]} />
        <meshStandardMaterial color="#2b4436" roughness={0.78} metalness={0.08} />
      </mesh>

      {/* lane lines */}
      {Array.from({ length: lanes }, (_, index) => {
        const x = (index - (lanes - 1) / 2) * 2.1;
        return (
          <mesh key={`lane-${index}`} rotation-x={-Math.PI / 2} position={[x, 0.014, 6]}>
            <planeGeometry args={[0.05, 60]} />
            <meshStandardMaterial color="#e9e7dd" emissive="#c6a45a" emissiveIntensity={0.16} roughness={0.7} />
          </mesh>
        );
      })}

      {/* start / finish markings */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, -12]}>
        <planeGeometry args={[26, 0.16]} />
        <meshStandardMaterial color="#c6a45a" emissive="#c6a45a" emissiveIntensity={0.3} roughness={0.6} />
      </mesh>

      {/* stepped stands, both sides */}
      {[1, -1].map((side) => (
        <group key={`stand-${side}`}>
          {Array.from({ length: standRows }, (_, row) => (
            <mesh
              key={`row-${row}`}
              position={[side * (15 + row * 2.1), 0.55 + row * 0.95, -2]}
              rotation-y={side * -0.06}
            >
              <boxGeometry args={[2.1, 0.95, 46]} />
              <meshStandardMaterial color={row % 2 === 0 ? '#1b2c23' : '#22362b'} roughness={0.92} />
            </mesh>
          ))}
          {/* outer wall */}
          <mesh position={[side * (16 + standRows * 2.1), 1.6, -2]} rotation-y={side * -0.06}>
            <boxGeometry args={[0.6, 4.2, 46]} />
            <meshStandardMaterial color="#0f1a15" roughness={1} />
          </mesh>
        </group>
      ))}

      {/* far stand behind the infield */}
      <group position={[0, 0, -44]}>
        {Array.from({ length: mobile ? 2 : 3 }, (_, row) => (
          <mesh key={`far-${row}`} position={[0, 0.5 + row * 0.9, -row * 1.8]}>
            <boxGeometry args={[52, 0.9, 2]} />
            <meshStandardMaterial color={row % 2 === 0 ? '#1b2c23' : '#1f3327'} roughness={0.95} />
          </mesh>
        ))}
      </group>

      {/* floodlight masts */}
      {FLOODLIGHT_POSITIONS.map(([x, z], index) => (
        <group key={`mast-${index}`} position={[x, 0, z]}>
          <mesh position={[0, 6.5, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 13, 8]} />
            <meshStandardMaterial color="#16241d" roughness={0.9} />
          </mesh>
          <mesh position={[0, 13.2, 0]}>
            <boxGeometry args={[2.4, 0.45, 0.16]} />
            <meshStandardMaterial
              color="#f4e7c2"
              emissive="#f4e7c2"
              emissiveIntensity={2.4}
              roughness={0.35}
            />
          </mesh>
          {!mobile && (
            <mesh position={[0, 6.4, 0]} rotation-x={Math.PI}>
              <coneGeometry args={[4.6, 13, 16, 1, true]} />
              <meshBasicMaterial
                color="#e0c890"
                transparent
                opacity={0.045}
                side={DoubleSide}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* haze band along the far edge */}
      <mesh position={[0, 3.4, -46]}>
        <planeGeometry args={[120, 12]} />
        <meshBasicMaterial color="#2f4a3a" transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </group>
  );
}
