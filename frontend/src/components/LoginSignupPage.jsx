import React from 'react'
import Signup from './Signup'
import Login from './Login'

function LoginSignupPage() {
  return (
    <div className='flex items-center border-green-600 border-2 justify-between w-full'>
        <Signup/>
        <Login/>
    </div>
  )
}

export default LoginSignupPage