import React, { ButtonHTMLAttributes, Children } from 'react'

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
   children : React.ReactNode,
   variant? : 'primary'|'primary-outline'|'setuju'|'tolak'|'secondary',
   width? : 'w-full'|'w-fit',
  
}
const Button:React.FC<buttonProps> = ({variant='primary',width='w-full',children,type}) => {
    let className ='';
    switch (variant) {
        case 'primary':
            className='bg-primary text-white'
            break;
        case 'secondary':
            className='bg-secondary text-white'
            break;
        case 'primary-outline':
            className='bg-transparent border  border-primary hover:bg-primary hover:text-white transition-colors text-primary'
            break;
        case 'setuju':
            className='bg-green-500 border   hover:bg-green-600 text-white transition-colors '
            break;
        case 'tolak':
            className='bg-red-500 border   hover:border-red-600 text-white transition-colors '
            break;
        default:
            break;
    }
  return (
    <button type={type} className={`${className} ${width} px-8 py-2 active:scale-95 h-fit duration-300  rounded `}>
        {children}
    </button>
  )
}

export default Button
