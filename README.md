File Upload Microservice
A NestJS-based microservice for uploading, processing, and managing files, built with Sequelize (SQLite), BullMQ (Redis), and JWT authentication. Features include file upload with metadata, background processing to compute SHA256 hashes, and paginated file retrieval.
Features

File Upload: Upload files (up to 10MB) with title and description.
Authentication: JWT-based authentication for secure access.
Background Processing: Processes files asynchronously using BullMQ and Redis to compute SHA256 hashes.
Database: Stores user and file metadata in SQLite using Sequelize.
API Documentation: Interactive Swagger UI at /api.
Rate Limiting: Limits upload frequency for security.



Install Dependencies:
npm install

Create .env File:

In the project root, create .env:REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
UPLOAD_MAX_SIZE=10485760

Create uploads/ Directory:
mkdir Uploads

Database Setup
The project uses SQLite (database.sqlite) with Sequelize. Run migrations to create the users and files tables and seed a test user (test@billeasy.com, password: billeasy@123).

Run Migrations Locally:
npm run migration:run

This executes sequelize-cli db:migrate, creating database.sqlite.

Verify Database:
sqlite3 database.sqlite
.tables

Expected: files users SequelizeMeta
Check test user:SELECT \* FROM users;

Exit: .quit

Running the Application
The application runs in Docker with two services: app (NestJS) and redis.

Start Docker Containers:
docker-compose up --build

Runs the app on http://localhost:3000 and Redis on port 6379.
Use -d for detached mode: docker-compose up -d --build.

Run Migrations in Container (if not done locally):
docker exec -it filemicroservice_app_1 sh
npx sequelize-cli db:migrate
exit

Stop Containers:
docker-compose down

API Usage
Test the APIs using cURL or Swagger UI (http://localhost:3000/api). All endpoints except /auth/login require JWT authentication.

1. Authenticate (POST /auth/login)
   curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@billeasy.com\",\"password\":\"billeasy@123\"}"

Response:{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Copy the accessToken for subsequent requests.

2. Upload File (POST /files/upload)

Requires a test file (e.g., test.txt):echo This is a test file > test.txt

Upload:curl -X POST http://localhost:3000/files/upload \
 -H "Authorization: Bearer <token>" \
 -F "file=@test.txt" \
 -F "title=Sample File" \
 -F "description=Test file for upload"

Response:{
"fileId": 1,
"status": "uploaded"
}

3. Check File Status (GET /files/:id)
   curl -X GET http://localhost:3000/files/1 -H "Authorization: Bearer <token>"

Response:{
"id": 1,
"userId": 1,
"originalFilename": "test.txt",
"storagePath": "uploads/file-<timestamp>-<random>-test.txt",
"title": "Sample File",
"description": "Test file for upload",
"status": "processed",
"extractedData": "SHA256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
"uploadedAt": "2025-05-20T12:00:00.000Z"
}

4. List Files (GET /files)
   curl -X GET http://localhost:3000/files?page=1&limit=10 -H "Authorization: Bearer <token>"

Response:{
"data": [
{
"id": 1,
"userId": 1,
"originalFilename": "test.txt",
"storagePath": "Uploads/file-<timestamp>-<random>-test.txt",
"title": "Sample File",
"description": "Test file for upload",
"status": "processed",
"extractedData": "SHA256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
"uploadedAt": "2025-05-20T12:00:00.000Z"
}
],
"meta": {
"page": 1,
"limit": 10,
"total": 1
}
}

Swagger UI

Access interactive API documentation at http://localhost:3000/api.
Authorize with Bearer <token> and test endpoints directly.

Troubleshooting

Migration Errors:

Verify src/database/config/database.json and .sequelizerc.
Re-run:del database.sqlite
npm run migration:run

API Errors:

401 Unauthorized: Ensure valid JWT (Bearer <token>).
500 Error: Check logs:docker-compose logs app

Verify Redis:docker exec filemicroservice_redis_1 redis-cli ping

File Upload Issues:

Ensure Uploads/ is writable:icacls Uploads /grant Users:RW

Check database:sqlite3 database.sqlite
SELECT \* FROM files;

Docker Issues:

Verify docker-compose.yml mounts:volumes:

- ./Uploads:/app/uploads
- ./database.sqlite:/app/database.sqlite

Rebuild:docker-compose down
docker-compose up --build

Directory Structure

src/: Source code
auth/: Authentication logic
database/: Sequelize config, migrations, models
files/: File upload and processing logic

Uploads/: Stores uploaded files
database.sqlite: SQLite database
.env: Environment variables
docker-compose.yml: Docker configuration
.sequelizerc: Sequelize CLI configuration
