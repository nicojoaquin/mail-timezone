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

### 1️⃣ Navigate to the project folder

```bash
cd "folder app name"
```

### 2️⃣ Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5434/maildb?schema=public"
MAILGUN_API_KEY=6fea6b501f8dfc3b4c6786d6508287fe-3af52e3b-ee9bd172
EMAIL_SMTP_HOST=smtp.mailgun.org
EMAIL_SMTP_USER=nicojoaquin-mail-cron@sandbox1bc9b7372e2b40a48425c4a304c39d1c.mailgun.org
EMAIL_SMTP_PASSWORD=mailcron
MAIL_HOUR=17
```

### 3️⃣ Install dependencies

```bash
yarn install
# or
yarn
```

### 4️⃣ Set up the database

```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

### 5️⃣ Start the application

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
