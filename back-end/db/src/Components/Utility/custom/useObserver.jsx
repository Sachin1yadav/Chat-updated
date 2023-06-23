
import { useState, useEffect } from "react";

function useObserver( scrollRef, callback ) {
  const [isIntersecting, setIsIntersecting] = useState(false);
//   const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    console.log(isIntersecting);
    try{
        observer.observe(scrollRef?.current);
    }catch(err){
        console.log(err, "Intersection observer error");
    }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    callback()
  }, [isIntersecting]);
}

export default useObserver;