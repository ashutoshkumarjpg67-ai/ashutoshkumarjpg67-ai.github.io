import { Canvas } from '@react-three/fiber';
import TrackEnvironment from './TrackEnvironment';
import AthleteFigure from './AthleteFigure';
import CameraRig from './CameraRig';

interface StadiumSceneProps {
  mobile: boolean;
  onReady: () => void;
}

/**
 * Lazy-loaded WebGL hero. Kept deliberately light: primitive geometry, one
 * directional key light, no shadows, no post-processing, demand-driven loop.
 */
export default function StadiumScene({ mobile, onReady }: StadiumSceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      frameloop="demand"
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.1, 11.5], fov: mobile ? 54 : 46, near: 0.1, far: 150 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0a1210');
        onReady();
      }}
    >
      <color attach="background" args={['#0a1210']} />
      <fog attach="fog" args={['#0a1210', 20, 92]} />

      <ambientLight intensity={0.9} color="#b6c6b9" />
      <hemisphereLight args={['#dfc98f', '#0b1411', 0.7]} />
      <directionalLight position={[8, 16, -4]} intensity={3.2} color="#f3e4bd" />
      <directionalLight position={[-10, 9, 12]} intensity={1.1} color="#a9bcae" />
      <spotLight
        position={[0, 15, 7]}
        angle={1.0}
        penumbra={1}
        intensity={90}
        distance={70}
        color="#f7ecd2"
      />
      <pointLight position={[0, 10, 0]} intensity={35} distance={50} color="#f4e7c2" />

      <TrackEnvironment mobile={mobile} />
      {/* Narrow screens keep the stadium only — the figure would crowd the copy. */}
      {!mobile && <AthleteFigure />}
      <CameraRig mobile={mobile} />
    </Canvas>
  );
}
