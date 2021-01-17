import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: 'alert-error.component.html',
  styleUrls: ['alert-error.component.css']
})
export class AlertErrorComponent {

  @Input() error: string;
  @Output() closeEvent = new EventEmitter<void>();

  closeAlert(): void {
    this.closeEvent.emit();
  }

}
