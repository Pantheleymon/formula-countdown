import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MainLayoutService } from './main-layout.service';

@Component({
  selector: 'app-main-layout',
  imports: [MatIconModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.less',
})
export class MainLayout implements OnInit {
  public state = inject(MainLayoutService).state;

  public get stateAsObjectEntries() {
    return Object.entries(this.state());
  }

  constructor(private mainLayoutService: MainLayoutService) {}

  public ngOnInit(): void {
    this.mainLayoutService.init();
  }

  public copyLink(): void {
    this.mainLayoutService.copyLink();
  }

  public openBottomSheet(): void {
    this.mainLayoutService.openBottomSheet();
  }
}
