import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  text = 'Are you sure?';
  title = '';
  yesButtonText = 'Yes';
  noButtonText = 'No';

  constructor(
    private dialog: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.text = (data && data.text) || this.text;
    this.title = (data && data.title) || this.title;
    this.yesButtonText = (data && data.yesButtonText) || this.yesButtonText;
    this.noButtonText = (data && data.noButtonText) || this.noButtonText;
  }

  ngOnInit() {
  }

  submit() {
    this.dialog.close(true);
  }
}
