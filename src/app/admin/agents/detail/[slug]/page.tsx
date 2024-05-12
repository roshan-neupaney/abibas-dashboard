import React from 'react'
import PageHeader from '../../../../../../components/pageHeader'
import DetailContainer from '../../../../../../components/container/detailContainer'
import AgentDetail from '../../../../../../components/agents/agentDetail'

const AgentDetailPage = () => {
  return (
    <>
    <PageHeader title="All New Hyundai Creta - 2021" showBack />
      <div className='bg-[#fcfcfc]'>
        <AgentDetail />
      </div>
    </>
  )
}

export default AgentDetailPage