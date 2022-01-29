import React, { useState, useEffect } from 'react'
import './Header.css'
import { useSelector } from 'react-redux'

import Options from './Options'
import { StyledLink, Input } from '../StyledComponents'
import SearchIcon from '@mui/icons-material/Search'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [basketNumber, setBasketNumber] = useState(0)
  const basket = useSelector(({ basket }) => basket)
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    if (Object.values(basket).length !== 0) {
      const sumItems = Object.values(basket).reduce((a, b) => a + b)
      setBasketNumber(sumItems)
    } else {
      setBasketNumber(0)
    }
  }, [basket])

  return (
    <div className='header'>
      <StyledLink to='/'>
        <div className='header-name'>LIA'S STORE</div>
      </StyledLink>

      <div className='search'>
        <Input type='text' style={{ borderRadius: '5px 0 0 5px' }} />
        <SearchIcon className='search-icon' />
      </div>

      {user && (
        <div className='nav-option-email'>
          {user.email.substring(0, user.email.indexOf('@'))}
        </div>
      )}

      <p className='nav-menu' onClick={() => setShowMenu(!showMenu)}>
        Menu
      </p>

      <nav className='horizontal-nav'>
        <Options user={user} basketNumber={basketNumber} />
      </nav>

      <nav className='vertical-nav' style={{ display: showMenu ? '' : 'none' }}>
        <Options
          user={user}
          basketNumber={basketNumber}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      </nav>
    </div>
  )
}

export default Header
