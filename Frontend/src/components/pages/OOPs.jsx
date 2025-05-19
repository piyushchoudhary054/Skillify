import React from 'react'
import YouTubeCard from './YouTubeCard'

const OOPs = () => {

  const videos = [
    {
      id: 1,
      videoId: `watch?v=nGJTWaaFdjc&list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9`,
      title: "Object Oriented Programming in C++",
    },
    {
      id: 2,
      videoId: `watch?v=tL8vnfFFzVQ&list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9&index=2`,
      title: `Classes, Public and Private access modifiers in C++`,
    },
    {
      id: 3,
      videoId: `watch?v=d363dW0AeS8&list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9&index=3`,
      title: `OOPs Recap & Nesting of Member Functions in C++`
    },
    {
      id: 4,
      videoId: `watch?v=qq05D2yFIHA&list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9&index=4`,
      title: `C++ Objects Memory Allocation & using Arrays in Classes`
    },
    {
      id: 5,
      videoId: `watch?v=QcLI2zGVYFo&list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9&index=5`,
      title: `Static Data Members & Methods in C++ OOPS`
    }
  ]
  return (
    <>
      <section>
        <div className='w-fit h-fit bg-black text-white'>
            <p className='text-bold text-2xl text-center p-4'>OOPs</p>
            <div className="grid grid-wrap grid-cols-4 gap-6 justify-center p-6">
              {videos.map((video,id)=>{
                return(<YouTubeCard
                  videoId={video.videoId}
                  title={video.title}
                >
                </YouTubeCard>);
              })}
            </div>
        </div>
      </section> 
    </>
  )
}

export default OOPs
