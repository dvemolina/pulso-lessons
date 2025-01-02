import { LessonRepository } from "./LessonRepository";
import type { LessonBasicsData } from "./lessonValidations";


export class LessonService {
    private lessonRepository = new LessonRepository()

    async createLesson(lessonBasicsData: LessonBasicsData, userId: number) {
        //Check if is Base Lesson
        if(lessonBasicsData.isBaseLesson === true) {
            //Add User Id into the lesson data
            lessonBasicsData.userId = userId;
            const { sports, ...lessonData} = lessonBasicsData;
            //Save Base Lesson Data and it's Sports
            const newLesson = await this.lessonRepository.createLesson(lessonData);
            await this.lessonRepository.updateLessonSports(newLesson.id, sports)

            return newLesson
        }
        //If is not Base Lesson
        //Has to save Lesson Basics, Sports and Specials(Conditionals/Seasonals/Promotionals)
    }

    async updateLesson(lessonDataUpdate: LessonBasicsData, lessonId: number) {
        if(Object.keys(lessonDataUpdate).length === 0) {
            return null
        }
        
        const { sports, ...lessonData } = lessonDataUpdate;
        
        // Update basic user fields
        if (Object.keys(lessonData).length > 0) {
            await this.lessonRepository.updateLesson(lessonId, lessonData);
        }
    
        // Update sports if provided
        if (Array.isArray(sports)) {
            await this.lessonRepository.updateLessonSports(lessonId, sports);
        }
    
        return true;
        //Has to update Lesson Basics, Sports and Specials(Conditionals/Seasonals/Promotionals)
    }

    async getLessonById(lessonId: number) {
        const lesson = await this.lessonRepository.getLessonById(lessonId); 
        const sports = await this.lessonRepository.getLessonSports(lessonId)

        return { ...lesson, sports };
    }

    async getUserLessons(userId: number) {
        const lessons = await this.lessonRepository.getLessonsByUserId(userId);

        // Use Promise.all to fetch sports for each lesson concurrently
        const lessonsWithSports = await Promise.all(
            lessons.map(async (lesson) => {
                const sports = await this.lessonRepository.getLessonSports(lesson.id); // Assuming `id` is the lesson identifier
                return { ...lesson, sports };
            })
        );

        return lessonsWithSports;
    }
}