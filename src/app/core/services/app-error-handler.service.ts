import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; 
import { DEBUG_DIALOGS, environment } from 'src/environments/environment'; 
import { SnackbarService } from './snackbar.service';
 
/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
    constructor(private snackbarService: SnackbarService) {
      super();
     
  }

    handleError(error: Error | HttpErrorResponse) {
        console.error('err');
        console.error(error);
    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

        this.snackbarService.error(displayMessage);
        if (DEBUG_DIALOGS) {
            this.snackbarService.showConfirmDialog({
                noCancelButton: true,
                messageHtml: `<span>${displayMessage}</span><pre>${error}</pre>`,
                title: `Error  `,
                confirmButtonText: 'OK'
            });
        }
    super.handleError(error);
  }
}
