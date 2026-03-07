import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarComponent } from '../snack-bar/snack-bar';

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
}
