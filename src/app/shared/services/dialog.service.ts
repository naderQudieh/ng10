import { Injectable, TemplateRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

enum ConfirmTextCode {
    DELETE = 'delete'
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogReff: any;
  constructor(public dialog: MatDialog) {}

  public open<T>(component: ComponentType<T> | TemplateRef<T>, dialogConfig?: any) {
    const dialogRef = this.dialog.open(component, dialogConfig);
    this.dialogReff = dialogRef;
    return dialogRef;
  }
    public openWidnow(component: ComponentType<unknown>, data: any = {}): any {
	    return this.dialog.open(component, { data, minWidth: '40vw' }).componentInstance;
    }

    public openSmall(component: ComponentType<unknown>, data: any = {}): any {
	    return this.dialog.open(component, { data, width: '450px' }).componentInstance;
    }

    //public confirm(textCode: ConfirmTextCode): Observable<boolean> {
	   // return this.dialog.open(ConfirmComponent, { data: textCode }).componentInstance.confirm$;
    //}

}
