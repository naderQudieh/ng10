import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfirmModalService {
  constructor(private dialog: MatDialog) {}

  showConfirm(data?: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data:
        typeof data === 'string'
          ? {
              text: data
            }
          : data,
      panelClass: 'scrollable-modal-container'
    });
    return dialogRef.afterClosed().pipe(map(result => !!result));
  }
}
