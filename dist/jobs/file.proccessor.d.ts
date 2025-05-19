import { Job } from 'bull';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
export declare class FileProcessor {
    private filesService;
    private fileModel;
    constructor(filesService: FilesService, fileModel: typeof File);
    processFile(job: Job<{
        fileId: number;
    }>): Promise<void>;
}
