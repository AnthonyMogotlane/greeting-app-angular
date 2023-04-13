import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-greeting-dialog',
  templateUrl: './greeting-dialog.component.html',
  styleUrls: ['./greeting-dialog.component.css']
})
export class GreetingDialogComponent {
  constructor(public dialogRef: MatDialogRef<GreetingDialogComponent>) {}

  greetMsg: string;
}
