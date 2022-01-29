import React, { useState, useEffect } from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'

import Options from './Options'
import { StyledLink } from '../StyledComponents'
import SearchIcon from '@mui/icons-material/Search'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const handleSearch = () => {
    dispatch({
      type: 'SET_KEYWORD',
      data: keyword,
    })
  }

  return (
    <div className='header'>
      <StyledLink to='/'>
        <div className='header-name'>LIA'S STORE</div>
      </StyledLink>

      <div className='search'>
        <input
          type='text'
          className='search-input'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <SearchIcon className='search-icon' onClick={handleSearch} />
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
        <Options user={user} />
      </nav>

      <nav className='vertical-nav' style={{ display: showMenu ? '' : 'none' }}>
        <Options user={user} showMenu={showMenu} setShowMenu={setShowMenu} />
      </nav>
    </div>
  )
}

export default Header
