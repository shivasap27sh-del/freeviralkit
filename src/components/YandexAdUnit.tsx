'use client';

import { useEffect, useRef } from 'react';

/**
 * Yandex.RTB ad unit component.
 */
export function YandexAdUnit({
  blockId,
  className = '',
}: {
  blockId: string;
  className?: string;
}) {
  const containerId = `yandex_rtb_${blockId}`;
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    try {
      if (typeof window !== 'undefined' && (window as any).yaContextCb) {
        (window as any).yaContextCb.push(() => {
          if ((window as any).Ya && (window as any).Ya.Context && (window as any).Ya.Context.AdvManager) {
            (window as any).Ya.Context.AdvManager.render({
              blockId: blockId,
              renderTo: containerId,
            });
            isLoaded.current = true;
          }
        });
      }
    } catch (err) {
      console.error('Yandex RTB error:', err);
    }
  }, [blockId, containerId]);

  return (
    <div className={`yandex-ad-container my-8 w-full flex flex-col items-center justify-center ${className}`}>
      <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mb-2">Advertisement</p>
      <div id={containerId}></div>
    </div>
  );
}
