import { Component, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  protected userTasks = input.required<Task[]>();
  protected userId = input.required<string>();
  protected order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  ActivatedRouteSnapshot: ActivatedRouteSnapshot,
) => {
  const order = ActivatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService.allTasks().filter(t => t.userId === ActivatedRouteSnapshot.paramMap.get('userId'));
  if(order && order === 'asc'){
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  };
  return tasks.length ? tasks : [];
};
