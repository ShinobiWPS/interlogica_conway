import { Cell } from '../components/Board.types'

const getNumAliveNeighbors = (board: Cell[][], cell: Cell) => {
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  let count = 0
  for (const offset of offsets) {
    const neighborRow = cell.row + offset[0]
    const neighborCol = cell.col + offset[1]
    if (
      neighborRow >= 0 &&
      neighborRow < board.length &&
      neighborCol >= 0 &&
      neighborCol < board[0].length
    ) {
      if (board[neighborRow][neighborCol].alive) {
        count++
      }
    }
  }
  return count
}
export default getNumAliveNeighbors