import { useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  AnimationMixer,
  LoopRepeat,
  Mesh,
  MeshStandardMaterial,
  type AnimationClip,
  type Group,
} from 'three';

const MODEL_URL = `${import.meta.env.BASE_URL}models/athlete-jog.glb`;

interface LoadedModel {
  scene: Group;
  clips: AnimationClip[];
}

function Runner({ scene, clips }: LoadedModel) {
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);

  useEffect(() => {
    const clip = clips[0];
    if (!clip) return;
    const action = mixer.clipAction(clip);
    action.setLoop(LoopRepeat, Infinity);
    action.play();
    return () => {
      action.stop();
      mixer.stopAllAction();
    };
  }, [clips, mixer]);

  useFrame((_, delta) => {
    // Clamp so a backgrounded tab does not fast-forward the loop on return.
    mixer.update(Math.min(delta, 0.05));
  });

  return <primitive object={scene} rotation-y={-1.15} />;
}

/**
 * Licensed CC0 rigged athlete (see public/models/README.md) running an in-place
 * jog loop. Loaded imperatively rather than with `useLoader` so the stadium
 * renders immediately instead of waiting on a 4.8 MB download; the figure simply
 * appears when it arrives.
 */
export default function AthleteModel() {
  const [model, setModel] = useState<LoadedModel | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();
    const material = new MeshStandardMaterial({
      color: '#3d5b47',
      roughness: 0.34,
      metalness: 0.45,
    });

    loader.load(
      MODEL_URL,
      (gltf) => {
        if (cancelled) return;
        gltf.scene.traverse((child) => {
          const mesh = child as Mesh;
          if (mesh.isMesh) {
            mesh.material = material;
            mesh.castShadow = false;
            mesh.receiveShadow = false;
            // Skinned bounds are computed in bind pose; disable culling so the
            // figure never pops out mid-stride.
            mesh.frustumCulled = false;
          }
        });
        setModel({ scene: gltf.scene, clips: gltf.animations });
      },
      undefined,
      () => {
        // Model failed to load: the stadium scene is still complete without it.
      },
    );

    return () => {
      cancelled = true;
      material.dispose();
    };
  }, []);

  if (!model) return null;

  return (
    <group position={[2.76, 0, 2.6]}>
      {/* soft contact shadow, since the scene runs without shadow maps */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.014, 0]} scale={[1, 1.5, 1]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#050908" transparent opacity={0.45} />
      </mesh>

      <Runner {...model} />

      <pointLight position={[1.4, 1.6, -1.6]} intensity={6} distance={9} color="#e0c890" />
      <pointLight position={[-1.6, 1.2, 0.6]} intensity={3} distance={7} color="#f3e4bd" />
    </group>
  );
}
