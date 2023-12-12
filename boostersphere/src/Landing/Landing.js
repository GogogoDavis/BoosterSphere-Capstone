import './Landing.css'
import { useContext } from 'react'
import { userContext } from '../App'
import { HomePage } from '../Home/HomePage'

export const Landing = () => {
  const { thisuser } = useContext(userContext)
  console.log(thisuser)
  return (thisuser ?  <HomePage />:
    <>
      <h1>Welcome To Booster Sphere!</h1>
    </>
  )
}
