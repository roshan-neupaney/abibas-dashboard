import React from 'react'
import DashboardCounts from './section/dashboardCounts'
import ChartContainer from './section/chartContainer'

const Insights = () => {
  return (
    <div className='flex flex-1 flex-col p-4 gap-4'>
      <DashboardCounts />
      <ChartContainer />
      <ChartContainer />
    </div>
  )
}

export default Insights