import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: './database.sqlite',
  autoLoadModels: true,
  synchronize: false,
};
