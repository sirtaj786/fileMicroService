import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../../auth/entities/user.entity';

@Table({ tableName: 'files', timestamps: false })
export class File extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  originalFilename: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  storagePath: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'uploaded',
    validate: {
      isIn: [['uploaded', 'processing', 'processed', 'failed']],
    },
  })
  status: 'uploaded' | 'processing' | 'processed' | 'failed';

  @Column({ type: DataType.TEXT, allowNull: true })
  extractedData: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  uploadedAt: Date;

  @BelongsTo(() => User)
  user: User;
}