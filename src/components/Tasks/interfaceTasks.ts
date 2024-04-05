export interface IGridLayout {
  x: number
  y: number
  w: number
  h: number
  i: string
  resizable: boolean
  static: boolean
}

export interface ITask {
  id: string
  name: string
  descr: string
  isActive: boolean
  checked: boolean
}