// budget.routes.ts
import { Routes } from '@angular/router';
import { rolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/logged-in-user';
import { ItemApprovalComponent } from './pages/item-approval/item-approval.component';
import { ItemEntryComponent } from './pages/item-entry/item-entry.component';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { canDeactivateGuard } from '../auth/guards/can-deactivate.guard';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';

export const routes: Routes = [
  { path: 'item-entry', component: ItemEntryComponent, title: 'Entry' },
  { path: 'editlist', component: ItemEditComponent, title: 'Youritem' },
  { path: 'item-add', component: ItemFormComponent, title: 'Add', canDeactivate: [canDeactivateGuard] }, // add
  { path: 'item-edit/:id', component: ItemFormComponent, title: 'Edit' },
  {
    path: 'item-approval',
    component: ItemApprovalComponent,
    title: 'Approval',
    canActivate: [rolesGuard([Role.ADMIN, Role.MANAGER,Role.GOD])]
  }
];

export default routes;
