import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  imports: [],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.less',
})
export class BottomSheetComponent {
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);

  public closeSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
