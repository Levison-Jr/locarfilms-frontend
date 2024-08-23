import { Component, Input } from '@angular/core';

type InputType = "text" | "email" | "password";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent {
  @Input() type: InputType = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
}
