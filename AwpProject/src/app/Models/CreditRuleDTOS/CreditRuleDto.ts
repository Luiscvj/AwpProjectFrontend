export class CreditRuleDto
{
    constructor
    (
        public creditRuleId: number = 0,
        public ruleName:string= '',
        public disciplineId:number= 0,
        public projectId: number = 0
    ){}
}