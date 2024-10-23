import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-errorr-modal',
  standalone: true,
  imports: [],
  templateUrl: './role-errorr.component.html',
  styleUrl: './role-errorr.component.scss'
})
export class RoleErrorrComponent {
  title ='ERROR';
  message = 'Error บางอย่าง'

  constructor(public bsModalRef: BsModalRef) {}
  close(): void {
    this.bsModalRef.hide();
  }

}
