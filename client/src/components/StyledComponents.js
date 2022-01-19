import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  padding: 20px;
  width: 100%;
  &:nth-child(1) {
    margin-right: 30px;
  }
`
