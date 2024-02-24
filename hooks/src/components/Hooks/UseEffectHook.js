import React, { useEffect, useState } from 'react'
import './style.css'

const UseEffect = () => {
    const data = 0;
    const [num, setNum] = useState(data)
    
    // useEffect(() => {
    // //   first
    
    // //   return () => {
    // //     second
    // //   }
    // // }, [third])
    // console.log("Hemlo");
    // });
    
    useEffect(() => {
      document.title = `React Practice (${num})`;
    })
    

    return (
    <>
    <div className="center_div">
        <p>{num}</p>
        <div className="button2" onClick={()=>{
            setNum(num+1)
        }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            INCR
        </div>
    </div>
    </>
    )
}

export default UseEffect;