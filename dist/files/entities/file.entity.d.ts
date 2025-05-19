import { Model } from 'sequelize-typescript';
import { User } from '../../auth/entities/user.entity';
export declare class File extends Model {
    id: number;
    userId: number;
    originalFilename: string;
    storagePath: string;
    title: string;
    description: string;
    status: 'uploaded' | 'processing' | 'processed' | 'failed';
    extractedData: string;
    uploadedAt: Date;
    user: User;
}
