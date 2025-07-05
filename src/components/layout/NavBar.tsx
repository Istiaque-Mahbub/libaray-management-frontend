import { Link } from 'react-router'
import book from '../../assets/undraw_bookshelves_vhu6.svg'





export default function NavBar() {
   return (<nav className='md:max-w-7xl mt-3 mx-auto h-16 flex items-center gap-3 mb-10 px-5'>
      <div className='flex items-center'>
         <img src={book} alt="" className='w-30 h-30 flex items-center bg-transparent' /> <span className='font-bold ml-2'>Library</span>Management
         <Link className='mx-5' to='/'>All Books</Link>
         <Link className='mx-5' to='/addBooks'>Add Books</Link>
         <Link className='mx-5' to='/borrow-summary'>Borrow Books</Link>
      </div>
   </nav>
   )
}