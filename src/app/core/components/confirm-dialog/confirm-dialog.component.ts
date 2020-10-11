import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../interfaces/confirm-dialog-data.interface';
import { MatButtonModule } from '@angular/material/button';
@Component({
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
	) {
	}

	ngOnInit(): void {
	}

	/**
	 * Close the dialog and return the result
	 * @param {boolean} result
	 */
	onActionClick(result: boolean) {
		this.dialogRef.close(result);
	}
}