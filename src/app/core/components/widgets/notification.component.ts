import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu3">
     <mat-icon matBadge="15" matBadgeColor="warn">notifications</mat-icon>
    </button>

    <mat-menu #menu3="matMenu">
      <mat-nav-list>
        <mat-list-item *ngFor="let message of messages">
          <a matLine href="#">{{ message }}</a>
          <button mat-icon-button>
            <mat-icon>info</mat-icon>
          </button>
        </mat-list-item>
      </mat-nav-list>
    </mat-menu>
  `,
})
export class NotificationComponent {
  messages = ['Server Error Reports', 'Server Error Reports', 'Server Error Reports'];
}
