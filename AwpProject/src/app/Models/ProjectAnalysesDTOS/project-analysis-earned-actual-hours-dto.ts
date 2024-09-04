export class ProjectAnalysisEarnedActualHoursDto {

        projectAnalysisId: number;
        projectAnalysisDate: Date;
        projectAnalysisEarnedHours: number;
        projectAnalysisActualHours: number;
        projectId: number = 0
    constructor
    (
        private _projectAnalysisId: number,
        private _projectAnalysisDate: Date,
        private _projectAnalysisEarnedHours: number = 0,
        private _projectAnalysisActualHours: number = 0,
        private _projectId: number = 0
    ){ 

        this.projectAnalysisId = _projectAnalysisId;
        this.projectAnalysisDate = new Date( _projectAnalysisDate);
        this.projectAnalysisEarnedHours = _projectAnalysisEarnedHours;
        this.projectAnalysisActualHours = _projectAnalysisActualHours;
        this.projectId = _projectId;
    }
}
