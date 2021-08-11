import { Component } from '@angular/core';
import {TaskInfo} from './task/task';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {TaskDialogResult} from './task-dialog/task-dialog-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: TaskInfo[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];

  title = 'kanban-fire';
  // todo: TaskInfo[] = [];
  inProgress: TaskInfo[] = [];
  done: TaskInfo[] = [];
  constructor(private dialog: MatDialog) {}

  editTask(list: 'done'| 'todo' | 'inProgress', task: TaskInfo): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    })
  }

  drop( event: CdkDragDrop<TaskInfo[]| null>): void {
   if (event.previousContainer === event.container) {
     return;
   }
   if (!event.container.data || !event.previousContainer.data) {
     return ;
   }
   transferArrayItem(
     event.previousContainer.data,
     event.container.data,
     event.previousIndex,
     event.currentIndex
   );
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      }
    });
    dialogRef.afterClosed()
             .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }

}
