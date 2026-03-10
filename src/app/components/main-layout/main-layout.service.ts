import { inject, Injectable, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarComponent } from '../snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet';

/**
 * Интерфейс параметров ссылки
 */
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
  /**
   * Состояние приложения, содержащее параметры ссылки и настройки отображения
   */
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

  /**
   * Всплывающее снизу уведомление
   */
  private _snackBar = inject(MatSnackBar);

  /**
   * Всплывающее окно снизу для настройки параметров отображения
   */
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private clipboard: Clipboard) {}

  /**
   * Инициализация состояния приложения, установка базового URL и размеров экрана
   */
  public init() {
    this.state.update((prev) => ({
      ...prev,
      linkBaseUrl: 'https://formula-countdown-backend.vercel.app',
      width: window.screen.width,
      height: window.screen.height,
    }));
  }

  /**
   * Копирование ссылки с параметрами в буфер обмена и отображение уведомления об успешном копировании
   */
  public copyLink() {
    // Проходим по всем параметрам и формируем URL для копирования
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

    // Показываем уведомление об успешном копировании
    this._snackBar.openFromComponent(SnackBarComponent, { duration: 2000 });
  }

  /**
   * Открытие нижнего окна для настройки параметров отображения
   */
  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      height: '60vh',
      panelClass: 'bottom-sheet',
      hasBackdrop: true,
    });
  }
}
