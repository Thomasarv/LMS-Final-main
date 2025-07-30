// import React from 'react'
// import { Link } from 'react-router-dom'  // assuming you use react-router for navigation

// const Footer = () => {
//   return (
//     <div className='bg-gray-800 py-4 flex justify-center gap-4'>
//       <p className='text-white'>© 2025 LMS Platform. All Rights Reserved.</p>
//       <Link to="/about-us" className='text-white hover:underline'>
//         About Us
//       </Link>
//     </div>
//   )
// }

// export default Footer


import React from 'react'
import { Link } from 'react-router-dom'  // assuming you use react-router for navigation

const Footer = () => {
  return (
    <div className="bg-gray-800 py-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4">
      <p className="text-white text-center sm:text-left text-sm sm:text-base">
        © 2025 LMS Platform. All Rights Reserved.
      </p>
      <Link to="/about-us" className="text-white hover:underline text-sm sm:text-base">
        About Us
      </Link>
    </div>
  )
}

export default Footer
