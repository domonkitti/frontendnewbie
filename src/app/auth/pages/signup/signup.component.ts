import { JsonPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, AlertModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  // router
  router = inject(Router);

  /// auth.service
  authService = inject(AuthService);

  // init form
  fb = inject(NonNullableFormBuilder);
  username = this.fb.control('');
  password = this.fb.control('');
  displayname = this.fb.control('');
  

  fg = this.fb.group({
    username: this.username,
    password: this.password,
    displayname: this.displayname
    
  });

  // error
  error?: any;

  ngOnInit() {
    
  }

  onSignup() {
    this.authService.signup(this.fg.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {this.error = error.error?.message|| 'ไม่สามารถระบุข้อผิดพลาดได้'}
    });
  }
}
