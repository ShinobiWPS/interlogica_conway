export interface BoardProps {
  rows: number
  cols: number
  updateFrequency: number
}

export interface Cell {
  row: number
  col: number
  alive: boolean
}