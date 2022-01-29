import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Alert from '@mui/material/Alert'

const lightMint = '#aaf0d1'
const mediumMint = '#83e2b7'
const darkMint = '#56c794'
const lightGrey = 'rgb(230, 230, 230)'
const darkGrey = 'rgb(165, 165, 165)'

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: ${(props) => (props.padding ? props.padding : '20px')};
  padding-right: ${(props) => (props.padding ? props.padding : '20px')};
  box-shadow: 0 0 10px ${darkGrey};
  box-shadow: 0 0 10px ${darkGrey};
  -moz-box-shadow: 0 0 10px ${darkGrey};
  -webkit-box-shadow: 0 0 10px ${darkGrey};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${lightGrey};
  margin: 40px 0;
`

export const StarRating = ({ rating }) => {
  const starArray = [...Array(rating).keys()]

  return (
    <div>
      {starArray.map((x) => (
        <StarIcon key={x} style={{ color: mediumMint, height: '80%' }} />
      ))}
    </div>
  )
}

export const StyledRemoveCircleIcon = styled(RemoveCircleIcon)`
  color: ${mediumMint};
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: ${darkMint};
  }
`

export const StyledAddCircleIcon = styled(AddCircleIcon)`
  color: ${mediumMint};
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: ${darkMint};
  }
`

export const StyledAlert = styled(Alert)`
  && {
    padding: 0 15px;
    border-radius: 5px;
  }
`
