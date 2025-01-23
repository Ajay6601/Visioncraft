import React from 'react'
import Image from 'next/image'
function Header() {
  return (
    <div>
      <div>
        <Image src={'/logo.svg'} width={30} height={30}/>
      </div>
    </div>
  )
}

export default Header