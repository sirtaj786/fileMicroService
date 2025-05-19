import { FilesService } from './files.service';
import { UploadFileDto } from './dto/uplod-file.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(user: {
        sub: number;
    }, file: Express.Multer.File, metadata: UploadFileDto): Promise<{
        fileId: number;
        status: string;
    }>;
    getFile(user: {
        sub: number;
    }, id: number): Promise<import("./entities/file.entity").File>;
    getFiles(user: {
        sub: number;
    }, page?: number, limit?: number): Promise<{
        data: import("./entities/file.entity").File[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
}
