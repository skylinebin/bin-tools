import { useEffect } from "react"
import { syncScroller } from "../utils/scroll"


export function useSyncScrollerEffect(args: any[], deps: any){
    const targets = args.map(item => item.current ?? item)
    useEffect(() => {    
        return syncScroller(targets);
    }, deps ?? targets)
}