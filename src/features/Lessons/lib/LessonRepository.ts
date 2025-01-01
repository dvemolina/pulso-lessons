import { db } from "$src/lib/server/db";
import { lessons, lessonSports, type InsertLessonBasics } from "$src/lib/server/db/schemas/lessons";
import { eq } from "drizzle-orm";

export class LessonRepository {

    async createLesson(lessonBasicsData: InsertLessonBasics) {
        const result = await db.insert(lessons).values(lessonBasicsData).returning();
        return result[0];
    }

    async getLessonById(lessonId: number) {
        const result = await db.select().from(lessons).where(eq(lessons.id, lessonId));
        return result[0]
    }

    async updateLesson(lessonId: number, updatedLessonData: InsertLessonBasics) {
        const result = await db.update(lessons).set(updatedLessonData).where(eq(lessons.id, lessonId)).returning();
        return result[0]
    }

    async updateLessonSports(lessonId: number, sports: number[]) {
        // Delete existing sports for the lesson
        await db.delete(lessonSports).where(eq(lessonSports.lessonId, lessonId));
    
        // Insert new sports
        if (sports.length > 0) {
            const newSports = sports.map((sportId) => ({
                lessonId: lessonId,
                sportId: sportId,
            }));
    
            await db.insert(lessonSports).values(newSports);
        }
    }

    async getLessonSports(lessonId: number) {
        const sports = await db
            .select()
            .from(lessonSports)
            .where(eq(lessonSports.lessonId, lessonId));
    
        return sports.map((s) => s.sportId) ;
    }
}