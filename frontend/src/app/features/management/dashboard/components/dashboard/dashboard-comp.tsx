
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title?: string;
}>

const ChartBlock = (props: Props) => {
  return (
    <div className='flex flex-col gap-3 justify-start items-start'>
      <h1 className='text-xl font-bold underline'>{props.title}</h1>
      <div className='ps-2'>{props.children}</div>
    </div>
  )
}

export default ChartBlock