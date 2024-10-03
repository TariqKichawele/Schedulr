## Schedulr

Schedulr is a Calendly-like web application that simplifies the process of scheduling meetings and appointments. It allows users to set their availability, share booking links, and streamline appointment scheduling with others without the back-and-forth of finding mutually available times.

![Screenshot 2024-10-03 at 9 56 34 AM](https://github.com/user-attachments/assets/e27870d8-74ac-4d53-ad71-4a583c559f0d)

**Tech Stack**

- Next.js: For building the server-rendered React application with SEO benefits and dynamic routing.
- Clerk: Handles user authentication, authorization, and user management seamlessly.
- NeonDB: A fully-managed, serverless, and scalable PostgreSQL database service, optimized for modern cloud applications.
- Prisma: An ORM used to interact with the database, making database queries simple and type-safe.
- Shadcn-UI: A utility-first CSS framework used to design and style the interface, ensuring modern and responsive components.

**Features**

🔑 User Authentication and Management
- Powered by Clerk, users can register, log in, and manage their accounts securely.
- Supports password-based, social logins, and two-factor authentication (2FA).

📅 Seamless Scheduling
- Users can define their available time slots for meetings.
- Supports multiple meeting types (one-on-one, group events).
- Shareable scheduling links for easy appointment booking.
- Users can set custom buffer times between meetings to avoid back-to-back appointments.
- Calendar integration: Sync your Google, Outlook, or other calendars to automatically detect availability.

📆 Calendar View
- A clear, intuitive calendar view allows users to visualize their schedule.
- Schedule management allows users to reschedule or cancel meetings directly from the calendar.
  
📝 Customizable Event Types
- Create different types of events, each with its own unique settings (e.g., duration, time zone, location).
- Allows for event customization with specific meeting purposes (e.g., team meeting, client consultation, personal).

🌐 Availability and Time Zone Handling
- Automatically adjusts for time zone differences when scheduling across regions.
- Users can block off specific days or hours from being bookable.

✉️ Automated Notifications & Reminders
- Email notifications to both the organizer and participants upon booking.
- Automated reminders are sent before scheduled meetings, reducing no-shows.

📊 Analytics Dashboard
- Track appointments, cancellations, and participant details.
- Insights into your scheduling efficiency, most booked times, and more.

⚡ Real-Time Updates
- Powered by Next.js and NeonDB, meetings and availability are updated in real-time, ensuring that users never double-book.
- Prisma ORM for secure and efficient database querying and management.

💅 Modern UI/UX Design
- Built with Shadcn-UI, providing a modern, responsive, and accessible user interface.
- Dark mode support, intuitive navigation, and mobile-friendly layouts for a smooth user experience.

🔗 External Integrations
- Integrate with popular calendar services (Google Calendar, Outlook).
- Webhooks for notifying third-party applications about new appointments or updates.

🔒 Security and Data Management
- End-to-end encryption for user data.
- Compliance with privacy and data protection standards (e.g., GDPR).
- User data is securely stored using NeonDB and managed through Prisma ORM.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
