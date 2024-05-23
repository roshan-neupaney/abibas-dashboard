import React from 'react'
import PageHeader from '../../../../../components/pageHeader'
import CarLoader from '../../../../../components/loader/carLoader'

const Loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Specification Category"/>
      {/* <CircularLoader /> */}
      <CarLoader />
    </div>
  )
}

export default Loading