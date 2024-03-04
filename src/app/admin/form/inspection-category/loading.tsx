import React from 'react'
import { CircularLoader } from '../../../../../components/loader/loader'
import PageHeader from '../../../../../components/pageHeader'

const Loading = () => {
  return (
    <div className="flex col gap-5">
      <PageHeader title="Inspection Category"/>
      <CircularLoader />
    </div>
  )
}

export default Loading