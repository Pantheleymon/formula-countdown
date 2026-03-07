import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarComponent } from '../snack-bar/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet';
@Component({
  selector: 'app-main-layout',
  imports: [MatIconModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.less',
})
export class MainLayout implements OnInit {
  public linkBaseUrl: string = '';
  public deviceHeight: number = null;
  public deviceWidth: number = null;

  private _snackBar = inject(MatSnackBar);
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private clipboard: Clipboard) {}

  public ngOnInit(): void {
    this.linkBaseUrl = window.location.origin;
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
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
