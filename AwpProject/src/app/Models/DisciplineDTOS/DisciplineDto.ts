export class DisciplineDto
{

    disciplineId: number;
    disciplineName:string;
    abbreviation:string;
    description:string;
    constructor
    (
        _DisciplineId:number = 0,
        _DisiciplineName: string= '',
        _Abbreviation: string = '',
        _Description: string = ''
    )
    {
        this.disciplineId = _DisciplineId;
        this.disciplineName = _DisiciplineName;
        this.abbreviation = _Abbreviation;
        this.description = _Description

    }


}