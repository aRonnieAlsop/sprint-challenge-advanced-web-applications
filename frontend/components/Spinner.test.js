// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Spinner from './Spinner'


test('sanity', () => {
  const chuckNorrisIsNeverWrong = true
  expect(chuckNorrisIsNeverWrong).toBe(true)
})

test('Renders without errors when on aka true', () => {
  render(<Spinner on={true} />)
})


test('Renders when true', () => {
  render(<Spinner on={true} />)
  const message = screen.queryByText(/Please wait/i)
  expect(message).toBeInTheDocument()
})

test('Does not render when false', () => {
  render(<Spinner on={false} />)
  const message = screen.queryByText(/Please wait/i)
  expect(message).not.toBeInTheDocument()
})