import React from 'react'
import { CircularLoader } from '../../../../components/loader/loader'
import PageHeader from '../../../../components/pageHeader'
import CarLoader from '../../../../components/loader/carLoader'

const Loading = () => {
  return (
    <div className="flex col gap-5">
      <PageHeader title="Inventory"/>
      {/* <CircularLoader /> */}
      <CarLoader />
    </div>
  )
}

export default Loading