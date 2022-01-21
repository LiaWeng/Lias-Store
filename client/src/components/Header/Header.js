import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

import { StyledLink, Input } from '../StyledComponents'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Header = ({ setLogin }) => {
  const basket = useSelector(({ basket }) => basket)
  const user = useSelector(({ user }) => user)

  return (
    <div className='header'>
      <StyledLink to='/'>
        <div className='name'>LIA'S STORE</div>
      </StyledLink>

      <div className='search'>
        <Input type='text' style={{ borderRadius: '5px 0 0 5px' }} />
        <SearchIcon className='search-icon' />
      </div>

      <div className='nav'>
        {user ? (
          <div className='option' onClick={() => signOut(auth)}>
            Sign out
          </div>
        ) : (
          <div className='option' onClick={() => setLogin(true)}>
            Sign In
          </div>
        )}

        <div className='option'>Account</div>
        <div className='option'>
          <StyledLink to='/orders'>Orders</StyledLink>
        </div>
        <div className='option'>
          <StyledLink to='/checkout'>
            <ShoppingBasketIcon className='basket-icon' />
            <span className='basket-count'>{basket.length}</span>
          </StyledLink>
        </div>
      </div>
    </div>
  )
}

export default Header
