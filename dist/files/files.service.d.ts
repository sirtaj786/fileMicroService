import { File } from './entities/file.entity';
import { JobsService } from '../jobs/jobs.service';
export declare class FilesService {
    private fileModel;
    private jobsService;
    constructor(fileModel: typeof File, jobsService: JobsService);
    uploadFile(userId: number, file: Express.Multer.File, metadata: {
        title?: string;
        description?: string;
    }): Promise<{
        fileId: number;
        status: string;
    }>;
    getFile(userId: number, fileId: number): Promise<File>;
    getFiles(userId: number, page: number, limit: number): Promise<{
        data: File[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getFileById(fileId: number): Promise<File>;
    updateFileStatus(fileId: number, status: File['status'], extractedData?: string): Promise<void>;
}
