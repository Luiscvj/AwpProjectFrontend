export class ConstructionWorkAreaDto
{
    constructor
    (
        public constructionWorkAreaId: number = 0,
        public cwaCode: string = '',
        public cwaStartDate: Date =new Date(),
        public cwaFinishDate: Date =new Date(),
        public cwaSequenceNumber: number = 0,
        public area:number = 0,
        public workerArea: number = 0,
        public cwaPlannedHours: number = 0,
        public cwaPlannedValue: number = 0,
        public unitOfMeasurementBySystemOfUnitId: number = 0,
        public projectId: number = 0
    ){}
}