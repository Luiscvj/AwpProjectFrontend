import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-breakdown-structure',
  standalone: true,
  imports: [],
  templateUrl: './work-breakdown-structure.component.html',
  styleUrl: './work-breakdown-structure.component.css'
})
export class WorkBreakdownStructureComponent implements OnInit {
  projectId: number| null = null;
  constructor(private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
   this.activateRoute.paramMap.subscribe(params=>
      {
        const id = params.get('projectId');
        this.projectId = Number(id);
        console.log(this.projectId);
      })
  }
}
