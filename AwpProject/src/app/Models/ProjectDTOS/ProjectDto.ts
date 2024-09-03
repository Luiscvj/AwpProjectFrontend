export class ProjectDto{
    public projectId: number;
    public projectCode: string;
    public projectValue: number; 
    public userId: string;
    public projectCategoryId: number;
    constructor
    (
        _ProjectId: number =0,
        _ProjectCode: string = '',
        _ProjectValue: number = 0,
        _UserId: string='',
        _ProjectCategoryId : number = 0
    ){
        this.projectId = _ProjectId;
        this.projectCode = _ProjectCode;
        this.projectValue = _ProjectValue;
        this.userId = _UserId;
        this.projectCategoryId = _ProjectCategoryId;   
    }
}

