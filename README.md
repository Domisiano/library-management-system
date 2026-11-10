Library Management System

A backend application built with NestJS, Prisma ORM, and PostgreSQL.

Technologies

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Neon Database

Database Schema

The database contains the following models:

- User: Stores user information and assigns roles using the "PATRON" and "LIBRARIAN" enum.
- Genre: Stores book categories.
- Book: Stores book details and references a genre.
- Review: Stores user reviews and ratings for books.

Schema Decisions

The "Book" model references the "Genre" model through a "genreId" foreign key instead of embedding genre information directly inside each book.

This relational approach avoids repeating genre information across multiple books, maintains data consistency, and makes it easier to update genre details in one place. The foreign key also ensures that each book is associated with an existing genre.

Database Seeding

The seed script ("api/prisma/seed.ts") populates the database with four genres and sixteen books distributed across those genres.

Prisma and Document Databases

In Prisma with PostgreSQL, relationships are defined using foreign keys and relational models. In a document database, related information can instead be embedded inside documents or linked using references. This makes relational database structure more explicit and enforces referential integrity.

Running the Application

From the "api" directory:

npm install
npx prisma generate
npx prisma db seed
npm run start:dev