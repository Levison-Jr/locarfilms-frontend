import { Component, EventEmitter, Input, Output } from '@angular/core';

type buttonType = "primatyButton" | "secondaryButton";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() btnType: buttonType = "primatyButton";
  @Output() onClick = new EventEmitter();

  onClickButton() {
    this.onClick.emit();
  }
}
