'use client'

import { Suspense, lazy } from 'react'

// Lazy load the Spline runtime to keep initial bundle sizes small
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center bg-transparent">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600"></div>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
            />
        </Suspense>
    )
}