import { useState, useEffect } from "react";

export function useResize() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=> {
        const handleResize = () => {
            if(typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 1200);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return {isMobile}
  
}

