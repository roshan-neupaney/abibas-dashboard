import Head from 'next/head'
import React from 'react'

const HeaderTitle = ({title= ''}) => {
  return (
    <title>{title} | Sawari</title>
  )
}

export default HeaderTitle