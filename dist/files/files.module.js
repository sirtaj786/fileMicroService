"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const sequelize_1 = require("@nestjs/sequelize");
const file_entity_1 = require("./entities/file.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const config_1 = require("@nestjs/config");
const jobs_module_1 = require("../jobs/jobs.module");
const config_2 = require("@nestjs/config");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([file_entity_1.File]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_2.ConfigModule],
                useFactory: (configService) => ({
                    storage: (0, multer_1.diskStorage)({
                        destination: './uploads',
                        filename: (req, file, cb) => {
                            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
                        },
                    }),
                    limits: {
                        fileSize: configService.get('UPLOAD_MAX_SIZE'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            (0, common_1.forwardRef)(() => jobs_module_1.JobsModule),
        ],
        providers: [files_service_1.FilesService],
        controllers: [files_controller_1.FilesController],
        exports: [files_service_1.FilesService],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map