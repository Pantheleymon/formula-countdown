import { inject, Injectable, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarComponent } from '../snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet';

export interface MainLayoutState {
  linkBaseUrl: string;
  height: any;
  width: any;
  showMap: boolean;
  showPractise: boolean;
  showSprint: boolean;
  showQualification: boolean;
  showRace: boolean;
  showCountDown: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MainLayoutService {
  public state = signal<MainLayoutState>({
    linkBaseUrl: '',
    height: null,
    width: null,
    showMap: true,
    showPractise: true,
    showSprint: true,
    showQualification: true,
    showRace: true,
    showCountDown: true,
  });

  private _snackBar = inject(MatSnackBar);
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private clipboard: Clipboard) {}

  public init() {
    this.state.update((prev) => ({
      ...prev,
      linkBaseUrl: window.location.origin,
      width: window.screen.width,
      height: window.screen.height,
    }));
  }

  public copyLink() {
    const url = Object.entries(this.state())
      .map((item, index) => {
        if (item[0] === 'linkBaseUrl') {
          return item[1];
        }
        if (index > 0) {
          return `${index === 1 ? '?' : '&'}${item[0]}=${item[1]}`;
        }
      })
      .join('');
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
