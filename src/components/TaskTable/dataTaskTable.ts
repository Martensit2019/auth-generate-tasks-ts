import { type IHeader } from './interfaceTaskTable'

export const tableHeaders: IHeader[] = [
  {
    code: 'name',
    title: 'Задача',
    width: '150px'
  },
  {
    code: 'descr',
    title: 'Описание',
    width: 'auto'
  },
  {
    code: 'status',
    title: 'Статус',
    width: '100px'
  },
  {
    code: 'actions',
    title: 'Действия',
    width: '100px'
  }
]
