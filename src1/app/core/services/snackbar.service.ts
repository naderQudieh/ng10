import { Injectable, NgZone} from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
 
@Injectable()
export class SnackbarService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public showSnackBarSuccess(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__success"];
        config.duration = 2500;
        config.verticalPosition = "bottom";
        this.snackBar.open(message, "", config);
    }

  public showSnackBarError(message: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = ["snackbar__error"];
        config.duration = 3000;
        config.verticalPosition = "bottom";
        this.snackBar.open(message, "", config);
    }

  public showSnackBarInfo (message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar__info'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'x', config);
    });
  }
}
