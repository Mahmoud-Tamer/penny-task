import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private baseDuration = 5000;
  private baseSnackBar!: MatSnackBar;
  public set duration(v: number) {
    this.baseDuration = v;
  }
  public set snack_bar(v: MatSnackBar) {
    this.baseSnackBar = v;
  }

  constructor(private loaderService: LoaderService) {}

  success(message: string): void {
    this.closeLabel((close) => {
      this.baseSnackBar &&
        this.baseSnackBar.open(message, close, {
          duration: this.baseDuration,
          panelClass: 'snack-success',
          direction: 'rtl' as any,
        });
    });
  }

  info(message: string): void {
    this.closeLabel((close) => {
      this.baseSnackBar &&
        this.baseSnackBar.open(message, close, {
          duration: this.baseDuration,
          panelClass: 'snack-info',
          direction: 'rtl' as any,
        });
    });
  }

  warning(message: string): void {
    this.closeLabel((close) => {
      this.baseSnackBar &&
        this.baseSnackBar.open(message, close, {
          duration: this.baseDuration,
          panelClass: 'snack-warning',
          direction: 'rtl' as any,
        });
    });
  }

  error(message: string): void {
    this.closeLabel((close) => {
      this.baseSnackBar &&
        this.baseSnackBar.open(message, close, {
          duration: this.baseDuration,
          panelClass: 'snack-error',
          direction: 'rtl' as any,
        });
    });
  }

  private closeLabel(callback: (closeLabel: string) => void): void {
    this.stopLoading();
    callback('Close');
  }

  private stopLoading(): void {
    this.loaderService.loading = false;
  }
}
