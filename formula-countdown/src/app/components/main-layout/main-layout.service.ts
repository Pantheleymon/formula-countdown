import { inject, Injectable, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarComponent } from '../snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class MainLayoutService {
  public linkBaseUrl = signal('');
  public deviceHeight = signal(null);
  public deviceWidth = signal(null);

  private _snackBar = inject(MatSnackBar);
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private clipboard: Clipboard) {}

  public init() {
    this.linkBaseUrl.set(window.location.origin);
    this.deviceWidth.set(window.screen.width);
    this.deviceHeight.set(window.screen.height);
  }

  public copyLink() {
    const url = `${this.linkBaseUrl}?height=${this.deviceHeight}?width=${this.deviceWidth}`;
    this.clipboard.copy(url);
    this._snackBar.openFromComponent(SnackBarComponent, { duration: 2000 });
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      height: '60vh',
      panelClass: 'bottom-sheet',
      hasBackdrop: true,
    });
  }
}
