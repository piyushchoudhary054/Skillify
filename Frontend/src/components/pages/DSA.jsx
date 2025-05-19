import React from 'react'
import YouTubeCard from './YouTubeCard';

const DSA = () => {
    let id = 1;
    let indx = 1;

    const videos = [
        {
            videoId: 'watch?v=VTLCoHnyACE&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt',
            title: `Lecture 1: Flowchart & Pseudocode + Installation`
        },
        {
            videoId: `watch?v=Dxu7GKtdbnA&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title: `Lecture  : Variable, Data Types & Operators`
        },
        {
            videoId: `watch?v=qR9U6bKxJ7g&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title: `Lecture : Conditional Statements & Loops`
        },
        {
            videoId: `watch?v=rga_q2N7vU8&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title: `Lecture : Patterns`
        },
        {
            videoId: `watch?v=P08Z_NC8GuY&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title: `Lecture : Functions`
        },
        {
            videoId: `watch?v=xpy5NXiBFvA&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title:`Lecture : Binary Number System`
        },
        {
            videoId:`watch?v=r-u4uh3QvsQ&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index= `,
            title: `Lecture : Bitwise Operators, Data Type Modifiers & more`
        },
        {
            videoId:'watch?v=8wmn7k1TTcI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=8',
            title: `Lecture :Array Data Structure`
        },
        {
            videoId:'watch?v=8wmn7k1TTcI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=9',
            title: `Lecture : Vectors in C++`
        },
        {
            videoId:'watch?v=8wmn7k1TTcI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=10',
            title: `Lecture : Kadane's Algorithm`
        }
    ]
  return (
    <>
        <div>
            <section className='bg-black rounded overflow-hidden shadow-lg p-4 w-fit h-fit'>
                <h1 className='text-center font-bold text-2xl text-white'>DSA</h1>
                <div className="grid grid-wrap grid-cols-4 gap-6 justify-center p-6">
                {videos.map((video) => {
                    const currentId = id++;
                    const currentIdx = indx++;
                    
                    if(currentIdx == 1){
                        return (
                            <YouTubeCard 
                            key = {indx}
                            videoId = {video.videoId}
                            title = {video.title}
                            />
                        )
                    }
                    
                    return(
                    <YouTubeCard
                    key={currentIdx}
                    videoId={`${video.videoId} ${currentId}`}
                    title={`Lecture ${currentIdx} ${video.title}`}
                    />
                    );
                })}
                </div>
            </section>
        </div>
    </>
  )
}

export default DSA
