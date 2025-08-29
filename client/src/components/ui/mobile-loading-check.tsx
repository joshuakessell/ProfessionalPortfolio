import { useEffect, useState } from 'react';

export function MobileLoadingCheck() {
  const [loadingInfo, setLoadingInfo] = useState<{
    userAgent: string;
    viewport: string;
    connection: string;
    performance: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = {
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        connection: (navigator as any).connection ? 
          `${(navigator as any).connection.effectiveType} - ${(navigator as any).connection.downlink}Mbps` : 
          'Unknown',
        performance: `${performance.now().toFixed(2)}ms`
      };
      setLoadingInfo(info);
      
      // Log for debugging
      console.log('Mobile Loading Check:', info);
    }
  }, []);

  if (!loadingInfo) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs max-w-xs">
      <div>UA: {loadingInfo.userAgent.substring(0, 50)}...</div>
      <div>Viewport: {loadingInfo.viewport}</div>
      <div>Connection: {loadingInfo.connection}</div>
      <div>Load Time: {loadingInfo.performance}</div>
    </div>
  );
}