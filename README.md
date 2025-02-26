# Mail Scheduler Application

## 📌 Overview

This application is built with **NestJS** and uses **PostgreSQL** with **Prisma** as the ORM. It also utilizes **nestjs-schedule** to run a cron job every hour.

Every hour, the application checks each user's timezone and sends an email if their selected time (default is **17:00**) has passed. The default value can be modified via environment variables.

## 🚀 Technologies Used

- **NestJS** - Backend framework
- **PostgreSQL** - Database
- **Prisma** - ORM for database management
- **nestjs-schedule** - Cron job scheduler
- **Nodemailer** - Email handling
- **Mailgun** - Email service provider
- **Dependency Injection** - Decouples the implementation from Nodemailer and Mailgun

## 📂 How to Run the Application

### 1️⃣ Install Yarn

Ensure that you have Yarn installed on your machine. If not, you can install it following the official guide: [Yarn Installation](https://classic.yarnpkg.com/lang/en/docs/install).

### 2️⃣ Navigate to the project folder

```bash
cd "folder app name"
```

### 3️⃣ Create a `.env` file with the variables that were provided

### 4️⃣ Install dependencies

```bash
yarn install
# or
yarn
```

### 5️⃣ Set up Docker and PostgreSQL

Make sure Docker and Docker Compose are installed. If they are not, you can install them from [Docker's official website](https://docs.docker.com/compose/install).

Run the following command to start the PostgreSQL container:

```bash
docker-compose up -d
```

This will start the PostgreSQL container in detached mode.

Run the following commands to set up the database and generate the necessary Prisma files:

```bash
yarn prisma migrate dev
yarn prisma generate
yarn prisma db seed
```

### 6️⃣ Start the application

```bash
yarn start:dev
```

## ⏳ Adjusting the Cron Job Frequency

If you want to change how often the cron job runs (for testing purposes), modify the `CronExpression` in the `task.service.ts` file:

```typescript
@Cron(CronExpression.EVERY_HOUR) // Change this as needed
```

Refer to [Cron Expressions](https://docs.nestjs.com/techniques/task-scheduling) for valid options.

## 📌 Main Business Logic

The core logic of the application is inside the `task.service.ts` file, which handles:

- Checking user timezones
- Verifying if the scheduled hour has passed
- Sending emails via Mailgun

## 👥 Modifying Test Users

If you want to modify test users and their email addresses, edit the `prisma/seed.ts` file.

```typescript
const users = [
  {
    email: 'test1@example.com',
    timezone: 'America/New_York',
  },
  {
    email: 'test2@example.com',
    timezone: 'Europe/London',
  },
];
```

To find valid timezone identifiers, check this list: [List of Timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (TZ Identifier column).

---

🎯 **Now your Mail Scheduler is ready to run!** 🚀
