import { LessonRepository } from "./LessonRepository";


export class LessonService {
    private lessonRepository = new LessonRepository()

    async createLesson() {
        //Only if lesson DOESN'T HAVE Id.
        //Has to save Lesson Basics, Sports and Specials(Conditionals/Seasonals/Promotionals)
    }

    async updateLesson() {
        //Only if lesson HAS Id.
        //Has to update Lesson Basics, Sports and Specials(Conditionals/Seasonals/Promotionals)
    }

    async getLessonById(lessonId: number) {
        const lesson = await this.lessonRepository.getLessonById(lessonId); 
        const sports = await this.lessonRepository.getLessonSports(lessonId)

        return { ...lesson, sports };
    }
}