import { Component, computed, DestroyRef, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet],
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  protected userName: string = '';
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ){};

  // userName = computed(
  //   () => this.userService
  //           .users
  //           .find(u => this.userId() === u.id)
  //           ?.name
  //   );

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: paramsMap => {
        this.userName = this.userService.users.find(u => u.id === paramsMap.get("userId"))?.name || "";
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
