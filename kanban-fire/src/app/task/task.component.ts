import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInfo} from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: TaskInfo | null = null;
  @Output() edit = new EventEmitter<TaskInfo>();
  constructor() { }

  ngOnInit() {
  }

}
