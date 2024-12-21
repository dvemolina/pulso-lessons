import { env } from '$env/dynamic/private';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';


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

    async uploadImage(imageBuffer: Buffer, fileName: string): Promise<string> {
        const compressedBuffer = await sharp(imageBuffer)
                            .rotate()
                            .resize(300, 300, { fit: "cover" })
                            .webp({ quality: 50 })
                            .toBuffer();
    
        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: env.R2_BUCKET_NAME,
                    Key: fileName,
                    Body: compressedBuffer,
                    ContentType: "image/webp"
                })
            );
    
            // Return the public URL of the uploaded image
            return `${env.R2_PUBLIC_URL}/${fileName}`;
        } catch (error) {
            console.error('Error uploading to R2:', error);
            throw new Error('Failed to upload image');
        }
    }
    

    
}