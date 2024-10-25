import { JsonPipe, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../user.service';
import { Role } from '../../../auth/models/logged-in-user';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditformComponent {
  @Input()
  id: number | null = null;

  location = inject(Location);
  fb = inject(NonNullableFormBuilder)
  userService = inject(UserService)


  username = this.fb.control<string>('', { validators: Validators.required });
  role = this.fb.control<Role>(Role.USER, { validators: Validators.required });
  displayname = this.fb.control<string>('', { validators: Validators.required });
  fg = this.fb.group({
    id:this.id,
    username: this.username,
    role: this.role,
    displayname: this.displayname,
  })
  ngOnInit() {
    console.log('id', this.id)
    if (this.id) {
      this.userService.get(this.id).subscribe(v => this.fg.patchValue(v))
    }
  }
  
  onBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    const user = {...this.fg.getRawValue() };
    console.log(user)
    if (this.id) {
      this.userService.edit(this.id, user).subscribe(() => this.onBack());
    } else {
    this.onBack()
    }
  }
}

