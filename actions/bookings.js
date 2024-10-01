'use server'

import { google } from "googleapis";
import { db } from "../lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function createBooking(bookingData) {
    try {
        const event = await db.event.findUnique({
            where: { id: bookingData.eventId },
            include: { user: true }
        })

        if(!event) {
            throw new Error("Event not found");
        }

        const { data } = await clerkClient.users.getUserOauthAccessToken(
            event.user.clerkUserId,
            "oauth_google"
        );

        const token = data[0]?.token;
        if(!token) throw new Error("No token found");

        // use google calendar api to generate a meeting link
        const oauth2client = new google.auth.OAuth2();
        oauth2client.setCredentials({ access_token: token });

        const calendar = google.calendar({ version: "v3", auth: oauth2client });

        // create google meet link
        const meetResponse = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: {
                summary: `${bookingData.name} - ${event.title}`,
                description: bookingData.additionalInfo,
                start: { dateTime: bookingData.startTime },
                end: { dateTime: bookingData.endTime },
                attendees: [{ email: bookingData.email }, { email: event.user.email }],
                conferenceData: {
                    createRequest: { requestId: `${event.id}-${Date.now()}`}
                }
            }
        });

        const meetLink = meetResponse.data.hangoutLink;
        const googleEventId = meetResponse.data.id;

        const booking = await db.booking.create({
            data: {
                eventId: event.id,
                userId: event.userId,
                startTime: bookingData.startTime,
                endTime: bookingData.endTime,
                additionalInfo: bookingData.additionalInfo,
                name: bookingData.name,
                email: bookingData.email,
                meetLink,
                googleEventId
            }
        });

        return { success: true, booking, meetLink };
    } catch (error) {
        console.error(error, "Error creating booking");
        return { success: false, error: error.message };
    }
};