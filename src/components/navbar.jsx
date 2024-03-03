import Link from 'next/link'

function Nav() {

  return (
    <>
      <nav className='navbar'>
        <div className='brand-logo'>
          <h1>Pulp</h1>
        </div>

        <div className='navlink'>
          <ul>
            <li><Link href="/"><span className='material-symbols-outlined'>home</span>Home</Link></li>
            <li><Link href="/about"><span className='material-symbols-outlined'>person</span>About</Link></li>
            <li><Link href="/connect"><span className='material-symbols-outlined'>person</span>Connect</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default Nav