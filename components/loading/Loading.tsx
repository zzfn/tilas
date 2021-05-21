import React, {ElementRef, MutableRefObject, useEffect, useRef} from 'react';

interface LoadingProps {
    noMore: boolean;
    onLoad: () => void
}

const Loading: React.FC<LoadingProps> = ({children, noMore, onLoad}) => {
    const loadingRef = useRef<HTMLDivElement>(null);
    const Observer = useRef<IntersectionObserver>();
    useEffect(() => {
        Observer.current = new IntersectionObserver(function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onLoad();
                }
            });
        });
        if (loadingRef.current) {
            Observer.current.observe(loadingRef.current);
        }
    }, []);
    useEffect(() => {
        if (noMore) {
            Observer.current?.disconnect();
        }
    });
    return (
        <>
            {children}
            {noMore ? (
                <section className={'zzf-loading-no-more'}>
                    暂无更多
                </section>
            ) : (
                <section ref={loadingRef}>
                    <section className={'zzf-loading-loader'}>Loading...</section>
                </section>
            )}
        </>
    );
}

export default Loading;
