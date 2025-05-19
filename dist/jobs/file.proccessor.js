"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const files_service_1 = require("../files/files.service");
const sequelize_1 = require("@nestjs/sequelize");
const file_entity_1 = require("../files/entities/file.entity");
const crypto = require("crypto");
const fs = require("fs/promises");
let FileProcessor = class FileProcessor {
    constructor(filesService, fileModel) {
        this.filesService = filesService;
        this.fileModel = fileModel;
    }
    async processFile(job) {
        const { fileId } = job.data;
        try {
            await this.filesService.updateFileStatus(fileId, 'processing');
            const file = await this.fileModel.findByPk(fileId);
            if (!file) {
                throw new Error('File not found');
            }
            const fileContent = await fs.readFile(file.storagePath);
            const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await this.filesService.updateFileStatus(fileId, 'processed', `SHA256: ${hash}`);
        }
        catch (error) {
            await this.filesService.updateFileStatus(fileId, 'failed', `Error: ${error.message}`);
            throw error;
        }
    }
};
exports.FileProcessor = FileProcessor;
__decorate([
    (0, bull_1.Process)('process-file'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileProcessor.prototype, "processFile", null);
exports.FileProcessor = FileProcessor = __decorate([
    (0, bull_1.Processor)('file-processing'),
    __param(1, (0, sequelize_1.InjectModel)(file_entity_1.File)),
    __metadata("design:paramtypes", [files_service_1.FilesService, Object])
], FileProcessor);
//# sourceMappingURL=file.proccessor.js.map