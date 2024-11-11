import React, { ButtonHTMLAttributes, Children } from 'react'

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
   children : React.ReactNode,
   variant? : 'primary',
   width? : 'w-full'|'w-fit',
  
}
const Button:React.FC<buttonProps> = ({variant='primary',width='w-full',children,type}) => {
    let className ='';
    switch (variant) {
        case 'primary':
            className='bg-primary text-white'
            break;
        default:
            break;
    }
  return (
    <button type={type} className={`${className} ${width} px-8 py-2 active:scale-95 duration-300  rounded `}>
        {children}
    </button>
  )
}

export default Button
