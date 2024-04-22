import React from 'react'
import sawariCar from '../../public/loader.svg'
import Image from 'next/image'

const CarLoader = () => {
  return (
    <span className='mx-auto mt-20'>
    <Image className='carLoader' src={sawariCar} width={100} height={100} alt='' />
    </span>
  )
}

export default CarLoader