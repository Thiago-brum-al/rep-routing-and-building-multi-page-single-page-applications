import { Routes } from "@angular/router";

import { routes as userRoutes } from "./users/users.routes";
import { NotFoundComponent } from "./not-found/not-found.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users/u1',
    pathMatch: 'full'
  },
  {
      path: 'users/:userId',
      component: UserTasksComponent,
      children: userRoutes,
      data: {
        message: 'Hello!'
      },
      resolve: {
        userName: resolveUserName
      }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
