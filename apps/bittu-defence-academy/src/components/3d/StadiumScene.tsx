import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import TrackEnvironment from './TrackEnvironment';
import AthleteModel from './AthleteModel';
import CameraRig from './CameraRig';

interface StadiumSceneProps {
  mobile: boolean;
  onReady: () => void;
}

/**
 * Lazy-loaded WebGL hero. Primitive stadium geometry, one rigged CC0 athlete,
 * no shadows, no post-processing. The render loop only runs while the hero is
 * on screen; the animated figure needs continuous frames, so the loop switches
 * to `never` once the hero scrolls out of view.
 */
export default function StadiumScene({ mobile, onReady }: StadiumSceneProps) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      frameloop={inView ? 'always' : 'never'}
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
      {!mobile && <AthleteModel />}
      <CameraRig mobile={mobile} />
    </Canvas>
  );
}
