import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as userRoutes } from "./users/users.routes";
import { NotFoundComponent } from "./not-found/not-found.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const urlTree = inject(Router);
  const value = Math.random();
  if(value < 0.5) return true;
  return new RedirectCommand(urlTree.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected'
    // redirectTo: 'tasks',
    // pathMatch: 'full'
  },
  {
      path: 'users/:userId',
      component: UserTasksComponent,
      children: userRoutes,
      runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      canMatch: [dummyCanMatch],
      resolve: {
        userName: resolveUserName
      },
      title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
