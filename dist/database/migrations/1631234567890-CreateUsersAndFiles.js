"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { QueryInterface, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
exports.default = {
    async up(queryInterface) {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        });
        await queryInterface.createTable('files', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            originalFilename: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            storagePath: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'uploaded',
                validate: {
                    isIn: [['uploaded', 'processing', 'processed', 'failed']],
                },
            },
            extractedData: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            uploadedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
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