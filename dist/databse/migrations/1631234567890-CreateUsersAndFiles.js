"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt");
exports.default = {
    async up(queryInterface) {
        await queryInterface.createTable('users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        await queryInterface.createTable('files', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            originalFilename: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            storagePath: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'uploaded',
                validate: {
                    isIn: [['uploaded', 'processing', 'processed', 'failed']],
                },
            },
            extractedData: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            uploadedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        const hashedPassword = await bcrypt.hash('password123', 10);
        await queryInterface.bulkInsert('users', [
            {
                email: 'user@example.com',
                password: hashedPassword,
                createdAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.dropTable('files');
        await queryInterface.dropTable('users');
    },
};
//# sourceMappingURL=1631234567890-CreateUsersAndFiles.js.map