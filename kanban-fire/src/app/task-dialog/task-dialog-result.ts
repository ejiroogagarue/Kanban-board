import {TaskInfo} from '../task/task';

export interface TaskDialogResult {
  task: TaskInfo;
  delete?: boolean;
}
