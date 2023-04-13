import { Component, OnInit } from '@angular/core';
import { GreetedService } from './greeted.service';
import { IPerson } from './person';

@Component({
  templateUrl: './greeted.component.html',
  styleUrls: ['./greeted.component.css']
})
export class GreetedComponent implements OnInit {
  pageTitle: string = "Greeted Names";
  errMsg: string = "";

  greetedNames: IPerson[] = [];

  constructor(private greetedService: GreetedService) {}

  ngOnInit(): void {
    this.greetedService.getGreetedNames().subscribe({
      next: greetedNames => this.greetedNames = greetedNames,
      error: err => this.errMsg = err
    })
  }
}
