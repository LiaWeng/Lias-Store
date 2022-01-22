import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const Button = styled.button`
  background-color: #aaf0d1;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`

export const Input = styled.input`
  height: 12px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 5px;
`

export const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: ${(props) => (props.padding ? props.padding : '20px')};
  padding-right: ${(props) => (props.padding ? props.padding : '20px')};
  width: 100%;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgb(230, 230, 230);
  margin: 40px 0;
`

export const StarRating = ({ rating }) => {
  const starArray = [...Array(rating).keys()]

  return (
    <div>
      {starArray.map((x) => (
        <StarIcon key={x} style={{ color: '#83e2b7', height: '80%' }} />
      ))}
    </div>
  )
}
