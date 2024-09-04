import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffcanvasProjectService } from '../../../../Services/Shared/OffcanvasProject/offcanvas-project.service';
import { ButtonOffCanvas } from '../../../../Models/Shared/Buttons/ButtonOffCanvas';
import { ProjectDto } from '../../../../Models/ProjectDTOS/ProjectDto';
import { ProjectService } from '../../../../Services/Project/project.service';
import { HomeHeaderProjectService } from '../../../../Services/Shared/HomeHeaderProject/home-header-project.service';
import {NgxEchartsDirective, provideEcharts} from 'ngx-echarts';
import { ProjectAnalysesService } from '../../../../Services/ProjectAnalyses/project-analyses.service';
import { ProjectAnalysisEarnedActualHoursDto } from '../../../../Models/ProjectAnalysesDTOS/project-analysis-earned-actual-hours-dto';
import { CommonModule } from '@angular/common';
import { EChartsOption } from 'echarts';
import { BehaviorSubject, Observable } from 'rxjs';
import { left } from '@popperjs/core';

@Component({
  selector: 'app-overall-project',
  standalone: true,
  imports: [
    CommonModule,
    NgxEchartsDirective
  
  ],
  templateUrl: './overall-project.component.html',
  styleUrl: './overall-project.component.css',
  providers:[
    provideEcharts(),
  
  ]
})
export class OverallProjectComponent implements OnInit, OnDestroy {
  public  project:ProjectDto = new ProjectDto();
  public  buttonToActivate:ButtonOffCanvas[] = [];
  private  projectAnalysesRecords: BehaviorSubject<ProjectAnalysisEarnedActualHoursDto[]> = new BehaviorSubject<ProjectAnalysisEarnedActualHoursDto[]>([]);
  public  _chartOption: EChartsOption = {};
  constructor(
    private route: ActivatedRoute,
    private  _offcanvasProjectService:OffcanvasProjectService,
    public _router:Router, 
    private _homeHeaderProjectService: HomeHeaderProjectService,
    private _projectAnalysesService:ProjectAnalysesService)
  {}



  ngOnInit(): void {
    
    
      this._homeHeaderProjectService.currentProjectState.subscribe(
        {
          next:(data)=>
            {
              if(data)
                {
                  this.project = data            
                }
            }
        })
      this.buttonToActivate =
      [
        {name:'Work Breakdown Structure',link:`./home/work-breakdown-structure/${this.project.projectId}`},
        {name:'Credit Rules', link:`./home/credit-rules/${this.project.projectId}`}
      ]
    
    this._offcanvasProjectService.updateButtons(this.buttonToActivate);

    if(this.project)
      {
        this._projectAnalysesService.GetGeneralProjectAnalysis(this.project.projectId).subscribe(
          {
            next:(data)=>
              {
               this.projectAnalysesRecords.next(data);  
              }
          })
          this.showData();
      }

  }


  showData():void
  {  
    let dataDates: string[] = [];
    let dataValueEarnedHours: number[] = [];
    let dataValueActualHours: number[] = [];
    this.projectAnalysesRecords.subscribe(
      {
        next:(data:ProjectAnalysisEarnedActualHoursDto[])=>
          {
            
            data.forEach(record =>
              {       
                 dataDates.push(record.projectAnalysisDate.toString().split('T')[0]);
                 dataValueActualHours.push(record.projectAnalysisActualHours);
                 dataValueEarnedHours.push(record.projectAnalysisEarnedHours);
              })
              this._chartOption = 
              {
                legend:
                {
                  data:['ActualHours','EarnedHours'],
                  align:left
                },
                xAxis: {
                  type: 'category',
                  data: dataDates,
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    name:'ActualHours',
                    data: dataValueActualHours,
                    type: 'line',
                  },
                  {
                    name: 'EarnedHours',
                    data: dataValueEarnedHours,
                    type: 'line'
                  }
                ],

              }
          }
      }) 
        console.log(dataDates, '\n', dataValueActualHours, '\n',dataValueEarnedHours);
  }


  ngOnDestroy(): void 
  {
  
    this._homeHeaderProjectService.removeHeaderInfo();
   
  
  }

}
