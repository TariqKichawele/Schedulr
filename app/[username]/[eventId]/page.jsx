import React, { Suspense } from 'react'
import { getEventDetails } from '../../../actions/events';
import { getEventAvailability } from '../../../actions/availability';
import { notFound } from 'next/navigation';
import EventDetails from '../../../components/EventDetails';
import BookingForm from '../../../components/BookingForm';

export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Schedulr`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

const EventPage = async ({ params }) => {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);
  
  if(!event) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  )
}

export default EventPage;