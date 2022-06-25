import Link from 'next/link'
import React from 'react'

const MobileBlock = (props) => {
  return (
    <div>
      <div className='md:block hidden'>
        {props.children}
      </div>
      <div className='md:hidden block'>
        <div className='text-center'>
          <span className="textMono block font-medium text-lg mt-20 mb-10">No support for mobile phones!</span>
          <Link href={"/"}>
            <a className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
              back to home page!
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileBlock