import React from 'react'
import PageHeader from '../../../../../components/pageHeader'
import FormContainer from '../../../../../components/container/form/formContainer'
import FormBody from '../../../../../components/addCar/formBody'

const AddInventory = () => {
  return (
    <>
    <PageHeader title='Add Car' />
    <FormContainer>
      <FormBody />
    </FormContainer>
    </>
  )
}

export default AddInventory