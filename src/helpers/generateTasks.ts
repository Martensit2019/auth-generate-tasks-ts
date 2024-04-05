import { type ITask } from "../components/Tasks/interfaceTasks"

export const generateUniqueIid = () => 'id' + Math.random().toString(16).slice(2)

const shuffleArr = (arr: ITask[]) => {
  let currentIndex = arr.length
  let temporaryValue: ITask
  let randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }

  return arr
}

export const generateTasks = (quantity: number) => {
  const toBuy = ['хлеба', 'молока', 'путёвку', 'книгу'].map((it) => `Купить ${it}`)
  const toLearn = ['React', 'Angular', 'Pyton'].map((it) => `Выучить ${it}`)
  const activity = ['Поспать', 'Прогуляться в лесу', 'Прокатиться на велике']
  const tasks = [...toBuy, ...toLearn, ...activity].map((task) => ({
    id: generateUniqueIid(),
    name: task,
    descr: `${task} Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, ipsam adipisci! Reiciendis adipisci odit deserunt perspiciatis exercitationem eaque soluta aliquam.`,
    isActive: true,
    checked: false
  }))
  console.log('quantity', quantity);
  
  return shuffleArr(tasks).slice(0, quantity)
}
