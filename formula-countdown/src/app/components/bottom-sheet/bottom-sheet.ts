import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MainLayoutService, MainLayoutState } from '../main-layout/main-layout.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  imports: [MatSlideToggleModule, MatButtonModule, FormsModule],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.less',
})
export class BottomSheetComponent {
  public state = inject(MainLayoutService).state;
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);

  public toggleChange(key: keyof MainLayoutState): void {
    this.state.update((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  public closeSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
