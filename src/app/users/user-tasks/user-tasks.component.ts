import { Component, computed, input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  constructor(
    private userService: UsersService
  ){};

  userName = computed(
    () => this.userService
            .users
            .find(u => this.userId() === u.id)
            ?.name
    );
}
