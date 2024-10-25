// auth.routes.ts
import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserEditformComponent } from './pages/user-editform/user-edit.component';

export const routes: Routes = [
  { path: 'list', component: UserListComponent, title: 'userlist' },
  { path: 'user-edit/:id', component: UserEditformComponent, title: 'userlist' },
];

export default routes;