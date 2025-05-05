const { useEffect, useState } = require("react");

const useDebounce=(str,delay=500)=>{
    const[debounce,setDebounce]=useState("");
    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounce(str);
        },delay)

        return ()=>clearTimeout(handler);
    })


    return debounce;
}
export default useDebounce;