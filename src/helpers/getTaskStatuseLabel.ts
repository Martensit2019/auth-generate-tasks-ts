import { TASK_STATUS, TASK_STATUS_LABEL } from '../enams/taskStatuses'

export const statusesList = ['all', 'active', 'done']

export function getTaskStatusLabel(status: string) {
  switch (status.toLowerCase()) {
    case TASK_STATUS.all:
      return TASK_STATUS_LABEL[TASK_STATUS.all]
    case TASK_STATUS.active:
      return TASK_STATUS_LABEL[TASK_STATUS.active]
    case TASK_STATUS.done:
      return TASK_STATUS_LABEL[TASK_STATUS.done]
    default:
      return undefined
  }
}
