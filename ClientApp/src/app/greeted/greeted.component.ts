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
  // Table properties
  displayedColumns: string[] = ['name', 'count', 'deleteBtns'];
  dataSource!: IPerson[];
  
  constructor(private greetedService: GreetedService) {}

  ngOnInit(): void {
    this.greetedService.getGreetedNames().subscribe({
      next: greetedNames => {
        this.greetedNames = greetedNames;
        this.dataSource = greetedNames;
      },
      error: err => this.errMsg = err
    })
  }

  onDeleteName(id: number){
    this.greetedService.deleteName(id).subscribe({
      next: greetedNames => {
        this.greetedNames = greetedNames;
        this.dataSource = this.greetedNames;
      }
    })
  }
}
