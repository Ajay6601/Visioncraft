import React from 'react'

function SelectStyle() {
    const styleOptions=[
        {
            name:'Realistic',
            image:'real.png'
        },
        {
            name:'Cartoon',
            image:'real.png'
        },
        {
            name:'Comic',
            image:'real.png'
        },
        {
            name:'WaterColor',
            image:'real.png'
        },
        {
            name:'GTA',
            image:'real.png'
        },


    ]
  return (
    <div>
        <h2 className='font-bold text-2xl text-primary'>
        Style
      </h2>
      <p className='text-gray-500'>Select your video Style</p>
    </div>
  )
}

export default SelectStyle