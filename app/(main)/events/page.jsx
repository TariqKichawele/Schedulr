import React, { Suspense } from 'react'
import { getUserEvents } from '../../../actions/events';
import EventCard from '../../../components/EventCard';

const EventsPage = () => {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <Events />
    </Suspense>
  )
}

const Events = async () => {
  const { events, username } = await getUserEvents();

  if(events.length === 0) {
    return (
      <p>You have not created any events yet. </p>
    )
  }

  return (
    <div className='gird gap-4 grid-cols-1 lg:grid-cols-2'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  )
}

export default EventsPage;