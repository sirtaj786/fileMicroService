import { Model } from 'sequelize-typescript';
import { File } from '../../files/entities/file.entity';
export declare class User extends Model {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    files: File[];
}
