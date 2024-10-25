import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MobileFormatPipe } from '../../../shared/pipes/mobile-format.pipe';
import { UserService } from '../../user.service';
import { UserEditable } from '../../../auth/models/logged-in-user';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MobileFormatPipe,DecimalPipe,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userService = inject(UserService);
  users: UserEditable[] = []
  filterUsers=this.users
  filterInput = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.userService.list().subscribe((vs) => {
      this.users = vs;
      this.filterUsers = vs;
    });

    this.filterInput.valueChanges
      .pipe(map((keyword) => keyword.toLocaleLowerCase()))
      .subscribe((keyword) => {
        this.filterUsers = this.users.filter((user) =>
          user.username.toLocaleLowerCase().includes(keyword)
        );
      });
  }
  
}
