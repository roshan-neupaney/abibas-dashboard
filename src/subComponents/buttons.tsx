import Image from 'next/image'
import AddIcon from '../../public/icons/icon-left-white.svg'

export const Button = () => {
  return (
    <div className='add-button'>
      <Image src={AddIcon} alt='' width={20} height={20} />
      <span className='label-add'>Add New</span>
    </div>
  )
}

export const SubmitButton = () => {
  return (
    <div className='submit-button'>
      <span className='label-submit'>Add Category</span>
    </div>
  )
}
export const CancleButton = () => {
  return (
    <div className='cancel-button'>
      <span className='label-cancel'>Cancel</span>
    </div>
  )
}