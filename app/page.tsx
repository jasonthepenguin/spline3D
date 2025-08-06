'use client';

import Spline from '@splinetool/react-spline';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    // Only treat as error if it's a critical loading error
    if (error?.message?.includes('Failed to load') || 
        error?.message?.includes('Network') ||
        error?.message?.includes('404')) {
      console.error('Spline loading error:', error);
      setHasError(true);
      setIsLoading(false);
    } else {
      // Log non-critical errors but don't show error state
      console.warn('Spline runtime warning:', error);
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading 3D Scene...</div>
        </div>
      )}

      {/* Error State with Instructions */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Scene Loading Error</h2>
          <div className="max-w-2xl text-center space-y-4">
            <p className="text-gray-300">
              To load your Spline robot scene, you need to export it properly from Spline:
            </p>
            <ol className="text-left text-gray-400 space-y-2">
              <li>1. Go to your Spline scene at: <a href="https://community.spline.design/file/8cfb6748-f3dd-44dd-89fb-f46c7ab4186e" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">community.spline.design/file/8cfb6748-f3dd-44dd-89fb-f46c7ab4186e</a></li>
              <li>2. Click "Remix" to open it in the Spline editor</li>
              <li>3. Click the "Export" button in the top toolbar</li>
              <li>4. Select "Code" → "React"</li>
              <li>5. Copy the scene URL (it should look like: https://prod.spline.design/xxxxx/scene.splinecode)</li>
              <li>6. Replace the scene prop in app/page.tsx with your URL</li>
            </ol>
            <p className="text-gray-500 text-sm mt-4">
              Note: Community URLs cannot be directly embedded. You must export from the Spline editor.
            </p>
          </div>
        </div>
      )}

      {/* Spline 3D Scene */}
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/geah-1oG5aSMWRMb/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
        />
      </div>
      
      {/* Overlay Content (only show when loaded) */}
      {!isLoading && !hasError && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
            Welcome to Spline3D
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl animate-fade-in-delay">
            Interactive 3D experiences powered by Next.js and Spline
          </p>
        </div>
      )}
    </main>
  );
}