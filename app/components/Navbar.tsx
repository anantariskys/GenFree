import Logo from '~/assets/Logo.png'
const Navbar = () => {
  return (
    <nav className='w-full py-4 fixed top-0 bg-white'>
        <main className='container flex justify-between items-center '>
            <img src={Logo} className='w-44 ' alt="" />
            <div className='flex items-center gap-4'>
                <p>test</p>
                <p>test</p>
                <p>test</p>

            </div>

        </main>
      
    </nav>
  )
}

export default Navbar
