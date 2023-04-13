import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GreetingDialogComponent } from './greeting-dialog/greeting-dialog.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pageTitle: string = "Greetings";
  languages: string[] = ["english", "isixhosa", "sepedi", "afrikaans"];
  greetMsg: string = "Test component";

  // Details from the form
  @ViewChild("greetingForm") greetingDetails!: NgForm;

  getName(): string {
    return this.greetingDetails.value.name;
  }

  getGreetingPhrase(): string {
    switch(this.greetingDetails.value.language) {
      case "english": return "Hello"
        break;
      case "isixhosa": return "Molo"
        break;
      case "sepedi": return "Dumela"
        break;
      case "afrikaans": return "Hallo"
        break;
      default:
        return "Hello";
    }
  }

  greetByName(): void {
    this.greetMsg = `${this.getName()} ${this.getGreetingPhrase()}`;
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(GreetingDialogComponent);
  }
}


