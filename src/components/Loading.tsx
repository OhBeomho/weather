import React from "react"
import styled, { keyframes } from "styled-components"

export default function Loading() {
  return <LoadingCircle></LoadingCircle>
}

const LoadingAnimation = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const LoadingCircle = styled.div`
  width: 80px;
  height: 80px;
  margin: 10px auto;
  border-radius: 100%;
  border: 15px solid transparent;
  border-top-color: white;
  border-bottom-color: white;
  animation: ${LoadingAnimation} 1s linear infinite;
`
