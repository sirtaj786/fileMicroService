import { Queue } from 'bull';
export declare class JobsService {
    private fileQueue;
    constructor(fileQueue: Queue);
    addFileProcessingJob(fileId: number): Promise<void>;
}
