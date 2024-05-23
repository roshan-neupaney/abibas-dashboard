import React from 'react'
import { CircularLoader } from '../../../../../components/loader/loader'
import PageHeader from '../../../../../components/pageHeader'

const Loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="News Category"/>
      <CircularLoader />
    </div>
  )
}

export default Loading