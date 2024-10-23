// roles.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/logged-in-user';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RoleErrorrComponent } from '../../shared/components/role-errorr/role-errorr.component';

export function rolesGuard(roles: Role[]): CanActivateFn {
  return (route, state) => {
  
    const loggedInUser = inject(AuthService).loggedInUser;
    const modalService = inject(BsModalService);

    if (loggedInUser && roles.includes(loggedInUser?.userProfile.role)) {
      return true;
    }
    const initialState = {
      message: 'You do not have the required role to view this page.'
    };
  
    modalService.show(RoleErrorrComponent, {
      initialState: {
        message: 'You do not have the required role to view this page.'
      }
    });
    return false;
  }
};
