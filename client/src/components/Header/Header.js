import React, { useState, useEffect } from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

import { StyledLink, Input } from '../StyledComponents'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Header = ({ setLogin }) => {
  const [basketNumber, setBasketNumber] = useState(0)
  const basket = useSelector(({ basket }) => basket)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.values(basket).length !== 0) {
      const sumItems = Object.values(basket).reduce((a, b) => a + b)
      setBasketNumber(sumItems)
    } else {
      setBasketNumber(0)
    }
  }, [basket])

  const handleLogOut = () => {
    signOut(auth)
    dispatch({
      type: 'EMPTY_BASKET',
    })
    navigate('/')
  }

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
        {user && (
          <div className='option-email'>
            {user.email.substring(0, user.email.indexOf('@'))}
          </div>
        )}

        {user ? (
          <div className='option' onClick={handleLogOut}>
            Sign out
          </div>
        ) : (
          <div className='option' onClick={() => setLogin(true)}>
            Sign In
          </div>
        )}

        <div className='option'>
          <StyledLink to='/orders'>Orders</StyledLink>
        </div>
        <div className='option'>
          <StyledLink to='/checkout'>
            <ShoppingBasketIcon className='basket-icon' />
            <span className='basket-count'>{basketNumber}</span>
          </StyledLink>
        </div>
      </div>
    </div>
  )
}

export default Header
