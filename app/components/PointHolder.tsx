"use client";

import React from 'react'

const PointHolder = () => {
    //このpoint変数にDBから取得APIを使って取得
    var point = 3;
    const ImagePath : number[] = [];
    for(let i : number = 1; i <= point; i++) {
        ImagePath.push(i);
    }
  return (
    <div className='flex flex-col'>
        <div>
            {pointCounter(point)}
        </div>
        <div className='grid grid-cols-2'>
            {
                ImagePath.map((key, value) => {
                    if((value % 4) == 0)
                    return(
                        <iframe src='https://giphy.com/embed/8chbBx5bb0jDezayC0' key={key}></iframe>
                    ) 
                    else if((value % 4) == 1) {
                        return(<iframe src='https://giphy.com/embed/4PNpBLLnCTelOzA6e7' key={key}></iframe>)
                    }
                    else if((value % 4) == 2) {
                         return(<iframe src='https://giphy.com/embed/bEsNyvZ3jU4Hi9qAfR' key={key}></iframe>)
                    }
                    else if((value % 4) == 3) {
                        return(<iframe src='https://giphy.com/embed/93jBii3Mj2gQ3MyD5F' key={key}></iframe>)
                    }
                })
            }
        </div>
    </div>
  )
}

const pointCounter = (point : number) => {
    if(point > 0) {
        return (
            <div className='flex justify-center m-10'>
                <button 
                    onClick={() => {
                        window.location.pathname = "/points"
                    }}
                    type="button"  
                    className="
                        text-white 
                        bg-gradient-to-r 
                        from-red-400 
                        via-red-500 to-red-600 
                        hover:bg-gradient-to-br 
                        focus:ring-4 
                        focus:outline-none 
                        focus:ring-red-300 
                        dark:focus:ring-red-800 
                        shadow-lg 
                        shadow-red-500/50 
                        dark:shadow-lg 
                        dark:shadow-red-800/80 
                        font-medium 
                        rounded-lg 
                        px-5 
                        py-2.5 
                        text-center 
                        me-2 
                        mb-2
                        text-4xl
                        ">
                            出撃する！
                </button>
            </div>
        )
    } else {
        return (
            <div className='flex justify-center items-center h-screen m-10'>
                <div
                    className='
                    text-white 
                    bg-gradient-to-r 
                    from-green-400 
                    via-green-500 
                    to-green-600
                    text-4xl
                    px-5 
                    py-2.5 
                    text-center 
                    me-2 
                    mb-2
                    rounded-lg
                    '>
                    出撃できる戦士がいません！
                </div>
            </div>
        )
    }
}

export default PointHolder