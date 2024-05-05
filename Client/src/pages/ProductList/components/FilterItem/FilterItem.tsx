const FilterItem = (props: {
  name: string
  quantity: number
  onChange?: (name: any, checked: boolean) => void
  checked?: boolean
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props?.onChange(props.name, e.target.checked)
    }
  }
  return (
    <div className='flex w-full items-center gap-2 py-2'>
      <input
        type='checkbox'
        className='cursor-pointer'
        id={props.name}
        onChange={handleChange}
        checked={props.checked}
      />
      <label htmlFor={props.name} className='cursor-pointer text-xs'>
        {props.name} ({props.quantity})
      </label>
    </div>
  )
}

export default FilterItem
