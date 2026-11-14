import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const CAMERA_START = new Vector3(0.4, 1.8, 10.4);
const CAMERA_END = new Vector3(1.0, 2.6, 8.8);
const LOOK_START = new Vector3(0.5, 1.35, -2);
const LOOK_END = new Vector3(0.8, 1.5, -6);

const MOBILE_CAMERA_START = new Vector3(0, 2.3, 14);
const MOBILE_CAMERA_END = new Vector3(0.6, 3.4, 9);
const MOBILE_LOOK_START = new Vector3(0, 1.4, -6);
const MOBILE_LOOK_END = new Vector3(0.2, 1.6, -12);

interface CameraRigProps {
  mobile: boolean;
}

/**
 * Scroll-driven camera. Runs only while there is movement left to resolve:
 * each frame asks R3F to render one more frame until the camera settles, then
 * the loop goes idle (`frameloop="demand"`).
 */
export default function CameraRig({ mobile }: CameraRigProps) {
  const { camera, invalidate } = useThree();
  const progress = useRef(0);
  const smoothed = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;

    const readProgress = () => {
      const hero = document.getElementById('hero');
      const height = hero?.offsetHeight ?? window.innerHeight;
      progress.current = Math.min(1, Math.max(0, window.scrollY / Math.max(height, 1)));
      invalidate();
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        readProgress();
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      invalidate();
    };

    readProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [invalidate]);

  useFrame(() => {
    const target = progress.current;
    smoothed.current += (target - smoothed.current) * 0.12;
    const p = smoothed.current;

    const from = mobile ? MOBILE_CAMERA_START : CAMERA_START;
    const to = mobile ? MOBILE_CAMERA_END : CAMERA_END;
    const lookFrom = mobile ? MOBILE_LOOK_START : LOOK_START;
    const lookTo = mobile ? MOBILE_LOOK_END : LOOK_END;

    const parallaxX = mobile ? 0 : pointer.current.x * 0.42;
    const parallaxY = mobile ? 0 : pointer.current.y * -0.16;

    camera.position.set(
      from.x + (to.x - from.x) * p + parallaxX,
      from.y + (to.y - from.y) * p + parallaxY,
      from.z + (to.z - from.z) * p,
    );

    camera.lookAt(
      lookFrom.x + (lookTo.x - lookFrom.x) * p + parallaxX * 0.35,
      lookFrom.y + (lookTo.y - lookFrom.y) * p + parallaxY * 0.35,
      lookFrom.z + (lookTo.z - lookFrom.z) * p,
    );

    if (Math.abs(target - smoothed.current) > 0.0015) invalidate();
  });

  return null;
}
