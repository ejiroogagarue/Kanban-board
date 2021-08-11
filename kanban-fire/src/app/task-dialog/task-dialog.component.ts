import {Component, Inject, OnInit} from '@angular/core';
import {TaskInfo} from '../task/task';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskDialogData} from './task-dialog-data';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<TaskInfo> = {...this.data.task};
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) { }

  cancel(): void {
   this.data.task.title = this.backupTask.title;
   this.data.task.description = this.backupTask.description;
   this.dialogRef.close(this.data);
  }
  ngOnInit() {
  }

}
