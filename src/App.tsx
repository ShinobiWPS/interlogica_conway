import React from 'react'
import "./App.css"
import Board from './components/Board'

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Conway's Game of Life</h1>
      <Board rows={50} cols={50} updateFrequency={250} />
    </div>
  )
}

export default App
