import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class JobsService {
  constructor(@InjectQueue('file-processing') private fileQueue: Queue) {}

  async addFileProcessingJob(fileId: number) {
    await this.fileQueue.add('process-file', { fileId }, { attempts: 3 });
  }
}