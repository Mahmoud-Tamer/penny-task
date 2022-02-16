import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';

@NgModule({
  declarations: [ConfirmationDialog],

  exports: [ConfirmationDialog],

  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
