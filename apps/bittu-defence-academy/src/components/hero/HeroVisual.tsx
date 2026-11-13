import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import StadiumBackdrop from './StadiumBackdrop';
import AthleteVisual from './AthleteVisual';
import { hasWebGL, isConstrainedConnection } from '../../lib/webgl';
import { cn } from '../../lib/cn';

const StadiumScene = lazy(() => import('../3d/StadiumScene'));

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Hero visual layer.
 *
 * The static stadium plate renders first and stays as the permanent fallback.
 * The WebGL scene is only requested when the device can handle it: motion is
 * allowed, WebGL exists, and the connection is not data-saver / 2G. It then
 * fades in over the plate once the first frame is ready.
 */
export default function HeroVisual() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    setMobile(query.matches);
    const onChange = (event: MediaQueryListEvent) => setMobile(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches || isConstrainedConnection() || !hasWebGL()) return;

    // Let the static hero paint and the fonts settle before paying for WebGL.
    const timer = window.setTimeout(() => setEnabled(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 ease-out',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      >
        <StadiumBackdrop />
        <AthleteVisual className="absolute right-[2%] bottom-[10%] hidden h-[58%] w-[26%] max-w-[360px] opacity-90 lg:block" />
      </div>

      {enabled && (
        <div className="pointer-events-none absolute inset-0">
          <SceneBoundary onFailure={() => setEnabled(false)}>
            <Suspense fallback={null}>
              <StadiumScene mobile={mobile} onReady={() => setReady(true)} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
