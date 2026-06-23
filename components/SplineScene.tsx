'use client'

import { Suspense, useEffect, useState } from 'react'

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // توليد رقم فريد لكسر كاش المتصفح نهائياً للملف البرمجي
        const uniqueKey = Date.now();
        const script = document.createElement('script');
        script.src = `https://unpkg.com/@splinetool/viewer@1.9.5/build/spline-viewer.js?v=${uniqueKey}`;
        script.type = 'module';
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    if (!mounted) {
        return <div className={className} />;
    }

    // إضافة معامل عشوائي للمجسم نفسه لضمان جلب النسخة الجديدة من سيرفرات Spline
    const cleanSceneUrl = `${scene}?nocache=${Date.now()}`;

    return (
        <div className={className}>
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center text-slate-400" dir="rtl">
                        جاري تحميل الواجهة التفاعلية...
                    </div>
                }
            >
                {/* @ts-ignore */}
                <spline-viewer url={cleanSceneUrl} />
            </Suspense>
        </div>
    )
}