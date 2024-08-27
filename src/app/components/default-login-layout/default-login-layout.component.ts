import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() primaryBtnDisabled: boolean = true;
  @Output("callbackPrimaryBtn") onClickPrimaryBtn = new EventEmitter();
  @Output("callbackSecondaryBtn") onClickSecondaryBtn = new EventEmitter();

  primaryBtnEmitter() {
    this.onClickPrimaryBtn.emit();
  }

  secondaryBtnEmitter() {
    this.onClickSecondaryBtn.emit();
  }
}
