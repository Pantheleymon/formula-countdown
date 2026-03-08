import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MainLayoutService } from '../main-layout/main-layout.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  imports: [MatSlideToggleModule, MatButtonModule, FormsModule],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.less',
})
export class BottomSheetComponent {
  public state = inject(MainLayoutService);
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);

  public closeSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
