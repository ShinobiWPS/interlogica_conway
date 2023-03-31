import { useEffect, useRef, useState } from 'react'
import getNumAliveNeighbors from '../helpers/getNumAliveNeighbors'
import { BoardProps, Cell } from './Board.types'

const PAUSE_BUTTON = '‖'
const PLAY_BUTTON = '▶'
const RESET_BUTTON = 'Reset'

const Board: React.FC<BoardProps> = ({ rows, cols, updateFrequency }) => {
  const [board, setBoard] = useState<Cell[][]>(() => {
    const initialBoard: Cell[][] = []
    for (let i = 0; i < rows; i++) {
      const row: Cell[] = []
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          alive: Math.random() > 0.5,
        })
      }
      initialBoard.push(row)
    }
    return initialBoard
  })

  const [isPlaying, setIsPlaying] = useState(false)

  const intervalId = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        setBoard((prevBoard) => {
          const newBoard: Cell[][] = []
          for (let i = 0; i < rows; i++) {
            const row: Cell[] = []
            for (let j = 0; j < cols; j++) {
              const cell = prevBoard[i][j]
              const numAliveNeighbors = getNumAliveNeighbors(prevBoard, cell)
              const isAlive = cell.alive
              if (isAlive && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
                row.push({ ...cell, alive: false })
              } else if (!isAlive && numAliveNeighbors === 3) {
                row.push({ ...cell, alive: true })
              } else {
                row.push(cell)
              }
            }
            newBoard.push(row)
          }
          return newBoard
        })
      }, updateFrequency)
    }
    return () => clearInterval(intervalId.current!)
  }, [isPlaying, rows, cols, updateFrequency])

  const handleCellClick = (row: number, col: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]
      newBoard[row][col].alive = !newBoard[row][col].alive
      return newBoard
    })
  }
  const handlePlayPauseClick = () =>
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)

  const handleResetClick = () => {
    setBoard(() => {
      const newBoard: Cell[][] = []
      for (let i = 0; i < rows; i++) {
        const row: Cell[] = []
        for (let j = 0; j < cols; j++) {
          row.push({
            row: i,
            col: j,
            alive: Math.random() > 0.5,
          })
        }
        newBoard.push(row)
      }
      return newBoard
    })
  }

  return (
    <>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={`${i},${j}`}
                className={`cell ${cell.alive ? 'alive' : ''}`}
                onClick={() => handleCellClick(i, j)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={handlePlayPauseClick}>
          {isPlaying ? PAUSE_BUTTON : PLAY_BUTTON}
        </button>
        <button onClick={handleResetClick}>{RESET_BUTTON}</button>
      </div>
    </>
  )
}
export default Board
