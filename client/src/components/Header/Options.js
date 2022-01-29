import React, { useState, useEffect } from 'react'
import './Options.css'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { StyledLink } from '../StyledComponents'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Options = ({ user, showMenu, setShowMenu }) => {
  const [basketNumber, setBasketNumber] = useState(0)
  const dispatch = useDispatch()
  const basket = useSelector(({ basket }) => basket)

  useEffect(() => {
    if (Object.values(basket).length !== 0) {
      const sumItems = Object.values(basket).reduce((a, b) => a + b)
      setBasketNumber(sumItems)
    } else {
      setBasketNumber(0)
    }
  }, [basket])

  const toggleMenu = () => {
    if (setShowMenu) {
      setShowMenu(!showMenu)
    }
  }

  const handleLogin = () => {
    dispatch({
      type: 'OPEN_LOGIN',
    })
    toggleMenu()
  }

  const handleLogOut = () => {
    signOut(auth)
    dispatch({
      type: 'EMPTY_BASKET',
    })
    toggleMenu()
  }

  return (
    <div className='nav-container'>
      <div className='nav-option nav-home'>
        <StyledLink to='/'>Home</StyledLink>
      </div>

      {user ? (
        <div className='nav-option' onClick={handleLogOut}>
          Sign out
        </div>
      ) : (
        <div className='nav-option' onClick={handleLogin}>
          Sign In
        </div>
      )}

      <div className='nav-option' onClick={toggleMenu}>
        <StyledLink to='/checkout'>
          <ShoppingBasketIcon className='basket-icon' />
          <span className='basket-count'>{basketNumber}</span>
        </StyledLink>
      </div>

      <div className='nav-option' onClick={toggleMenu}>
        <StyledLink to='/orders'>Orders</StyledLink>
      </div>
    </div>
  )
}

export default Options
