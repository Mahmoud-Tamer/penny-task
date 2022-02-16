import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'confirmation.dialog.html',
  styleUrls: ['confirmation.dialog.scss'],
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}

  noClick(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmationData {
  title!: string;
  subTitle!: string;
  cancel?: string;
  confirm?: string;
  result?: boolean;
}
