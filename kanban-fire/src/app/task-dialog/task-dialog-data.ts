import {TaskInfo} from '../task/task';

export interface TaskDialogData {
  task: Partial<TaskInfo>;
  enableDelete: boolean;
}
