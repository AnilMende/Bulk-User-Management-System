==>Bulk User Management System(Backend)::

-> A scalable backend service designed to efficiently manage large-scale user datasets (5000+ users) with optimized database operations, bulk processing, and analytics capabilities.
   This project demonstrates backend engineering concepts such as bulk data handling, optimized MongoDB queries, pagination, aggregation pipelines, and REST API design.

-> Built using Node.js, Express.js, and MongoDB, the system focuses on performance, scalability, and clean API architecture.

==> Architecture Overview ::

Client (Postman / Frontend)
        │
        ▼
Express.js REST API
        │
        ▼
Controllers → Business Logic
        │
        ▼
Mongoose Models
        │
        ▼
MongoDB Database

-> The backend follows a modular structure seaparating: API routes, controllers (business logic), database models, utilities/scripts.

==> Key Features Implemented: 

1. Bulk User Creation (5000+ users) :
   Efficient insertion of large datasets using MongoDB's insertMany() method. Supports high-performance insertion with unordered operations to prevent partial failures.
   
   Endpoint : POST /api/users/bulk-create

2. Bulk User Updates:
   Allows updating multiple users in a single request using MongoDB bulkWrite(), which is significantly faster than performing multiple individual updates.

   Endpoint : PATCH /api/users/bulk-update

3. Pagination for Large Datasets:
   Handles large user datasets efficiently by implementing server-side pagination.

   Endpoint : GET /api/users?page=1&limit=50

4. Search Users:
   Implements flexible user search using MongoDB regex queries. Users can be searched using name or email.

   Endpoint : GET /api/users/search?q=user
   
5.Wallet Balance Update:
  Allows updating wallet balance for an individual user.

  Endpoint : PATCH /api/users/:id/wallet

6.Device Usage Analytics:
  Provides insights into device usage distribution among users using MongoDB aggregation pipelines.

  Endpoint : GET /api/users/device-stats


==> Database Handling::

The system uses MongoDB with Mongoose ORM for schema modeling and database interaction.

To meet assignment requirements:

5000+ user records were generated

bulk operations optimized for performance

efficient search and pagination queries implemented

aggregation used for analytics


==> Database Export & Backup::

The project includes database export functionality for dataset verification.

Export Users as JSON : mongoexport --db test --collection users --out users.json --jsonArray

Database Backup (BSON) : mongodump --db test --collection users --out db_backup

This allows evaluators to restore the database easily.


==> Tech Stack::

->Backend : Node.js, Express.js

->Database: MongoDB, Mongoose

->Testing: Postman

->Other Tools: MongoDB Atlas, MongoDB Database Tools


==> Project Structure::

backend
│
├── controllers
│   └── userController.js
│
├── models
│   └── userModel.js
│
├── routes
│   └── userRoutes.js
│
├── scripts
│   └── generateUsers.js
│
├── server.js
├── package.json
└── README.md
