import { env } from '$env/dynamic/private';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export class StorageService {
    private s3Client: S3Client;
    
    constructor() {
        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: env.R2_ACCESS_KEY_ID!,
                secretAccessKey: env.R2_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadImage(base64Image: string, userId: number, userName: string): Promise<string> {
        // Remove the data URL prefix and convert to buffer
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const uniqueFileName = `${userId}-${userName}-profile`;

        console.log("Bucket Name:", env.R2_BUCKET_NAME);

        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: env.R2_BUCKET_NAME,
                    Key: uniqueFileName,
                    Body: imageBuffer,
                    ContentType: this.getContentType(base64Image),
                })
            );

            // Return the public URL of the uploaded image
            return `${env.R2_PUBLIC_URL}/${uniqueFileName}`;
        } catch (error) {
            console.error('Error uploading to R2:', error);
            throw new Error('Failed to upload image');
        }
    }

    private getContentType(base64String: string): string {
        const match = base64String.match(/^data:([^;]+);/);
        return match ? match[1] : 'image/jpeg';
    }
}