# Event Buddy Backend

## Overview
Event Buddy is a RESTful API backend for an event booking system built with NestJS, TypeScript, PostgreSQL, and JWT authentication. It supports user registration/login, event management, and seat booking with role-based access control.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd event_buddy-event_booking_system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your username and password in app.module.ts for database connect:
   ```bash
   imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'eventbuddy_db',
      entities: [User, Event, Booking],
      synchronize: true,
    }),
    AuthModule,
    EventsModule,
    BookingsModule,],
   ```
4. Set up the PostgreSQL database:
   - Create a database named `eventbuddy_db`.
5. Start the application:
   ```bash
   npm run start:dev
   ```

### Usage
- Access the API at `http://localhost:3000`.
- API documentation is available at `http://localhost:3000/api` (Swagger).
- Use tools like Postman to test endpoints.

### Endpoints
- **Public**:
  - `GET /events/upcoming`: List upcoming events.
  - `GET /events/previous`: List previous events.
  - `GET /events/:id`: Get event details.
- **User (Authenticated)**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Login and get JWT.
  - `POST /bookings`: Book seats for an event.
  - `GET /bookings`: View user's bookings.
- **Admin (Authenticated)**:
  - `GET /events`: List all events.
  - `POST /events`: Create a new event.
  - `PUT /events/:id`: Update an event.
  - `DELETE /events/:id`: Delete an event.

### Notes
- Ensure PostgreSQL is running before starting the application.
- Input validation and error handling are implemented for all endpoints.
