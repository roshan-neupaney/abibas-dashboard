import React from 'react'
import PageHeader from '../../../../../components/pageHeader'
import CarLoader from '../../../../../components/loader/carLoader'

const Loading = () => {
  return (
    <div className="flex col gap-5">
      <PageHeader title="Blog Category"/>
      <CarLoader />
    </div>
  )
}

export default Loading