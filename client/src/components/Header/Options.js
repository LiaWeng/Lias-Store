import React from 'react'
import './Options.css'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

import { StyledLink } from '../StyledComponents'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Options = ({ user, basketNumber, showMenu, setShowMenu }) => {
  const dispatch = useDispatch()

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
