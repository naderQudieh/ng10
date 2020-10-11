import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss, MatSnackBarRef } from '@angular/material/snack-bar';
import { SwPush } from '@angular/service-worker';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/core/interfaces/confirm-dialog-data.interface';

enum NotificationPermissions {
    GRANTED = 'granted',
    DENIED = 'denied',
    DEFAULT = 'default'
}

 
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

   snackbarRef: MatSnackBarRef<any>;
  constructor(
    private readonly snackBar: MatSnackBar,
      private readonly zone: NgZone
      , private swPush: SwPush, private _dialog: MatDialog
  ) {}

    

  default(message: string) {
    this.show(message, { 
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, { 
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string) {
    this.show(message, { 
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string) {
    this.show(message, { 
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string) {
    this.show(message, { 
      panelClass: 'error-notification-overlay'
    });
  }

    private show(message: string, configuration: MatSnackBarConfig, actionFn?: (...args) => void): void {
        configuration.horizontalPosition = 'center';
        configuration.verticalPosition = 'bottom';
        configuration.duration = 3000;
        this.zone.run(() => {
            this.snackbarRef = this.snackBar.open(message, null, configuration);
            const dismissSub = this.snackbarRef.afterDismissed()
                .subscribe((matSnackbarDismissedEvt: MatSnackBarDismiss) => {
                    dismissSub.unsubscribe();
                });
            const actionSub = this.snackbarRef.onAction()
                .subscribe(() => {
                    if (actionFn) {
                        actionFn();
                    }
                    actionSub.unsubscribe();
                });

        });
    }

    async checkOSNotificationPermissions() {
        if (!('Notification' in window)) {
            throw new Error('Notifications are not supported');
        } else {
            return await Notification.requestPermission() as NotificationPermissions;
        }
    }

    async showOsNotification(title: string, body: string, icon?: string, actions?: NotificationAction[]) {
        let notificationPermission = NotificationPermissions.DEFAULT;
        try {
            notificationPermission = await this.checkOSNotificationPermissions();
        } catch (err) {
            console.error(err);
        }
        if (notificationPermission === NotificationPermissions.GRANTED && title && body) {
            const timestamp = new Date().getTime();
            const swReg = await navigator.serviceWorker.getRegistration();
            if (swReg) {
                await swReg.showNotification(title, { body, icon, actions });
            }
        }
    }

    showConfirmDialog(dialogData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent, ConfirmDialogData> {
        return this._dialog.open(ConfirmDialogComponent, { data: dialogData });
    }

}
