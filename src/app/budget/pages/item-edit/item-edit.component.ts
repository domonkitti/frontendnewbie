import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { ItemService } from '../../item.service';
import { Item, ItemStatus } from '../../models/item';
import { MobileFormatPipe } from '../../../shared/pipes/mobile-format.pipe';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { BudgetPlanComponent } from '../../components/budget-plan/budget-plan.component';
import { BudgetPlanService } from '../../budget-plan.service';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MobileFormatPipe,DecimalPipe,RouterLink,BudgetPlanComponent],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent {

  isSmallTable = false;

  itemService = inject(ItemService);

  items: Item[] = [];
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true });
  modalService = inject(BsModalService)
  budgetPlanService = inject(BudgetPlanService)
  bsModalRef?: BsModalRef;

  constructor() {
    this.itemService.listforedit().subscribe((vs) => {
      this.items = vs;
      this.filterItems = vs;
      this.updateUsed();
    });

    this.filterInput.valueChanges
      .pipe(map((keyword) => keyword.toLocaleLowerCase()))
      .subscribe((keyword) => {
        this.filterItems = this.items.filter((item) =>
          item.title.toLocaleLowerCase().includes(keyword)
        );
        this.updateUsed();
      });
  }
  onConfirm(item: Item) {
    const initialState: ModalOptions = {
      initialState: {
        title: `Confirm to delete "${item.title}" ?`
      }
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    this.bsModalRef?.onHidden?.subscribe(() => {
      if (this.bsModalRef?.content?.confirmed) {
        this.onDelete(item.id)
      }
    })

  }
  onDelete(id: number) {
    return this.itemService.delete(id).subscribe(v => {
      this.items = this.items.filter(item => item.id != id)
      this.filterItems = this.items
    });
  }
  private updateUsed() {
    const used = this.items
      .filter((v) => v.status === ItemStatus.APPROVED)
      .map((v) => v.price*v.amount)
      .reduce((p, v) => (p += v), 0);
    this.budgetPlanService.updateUsed(used);
  }
    
}
