export class ProjectCategoryDto {

    constructor(
        public projectCategoryId: number = 0,
        public categoryName: string= '',
        public categoryLevel: number = 0
    ){}
}
