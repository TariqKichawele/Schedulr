import React from 'react'
import { getUserAvailability } from '../../../actions/availability';
import { defaultAvailability } from './data';
import AvailabilityForm from '../../../components/AvailabilityForm';

const Availability = async () => {
  const availability = await getUserAvailability();

  return (
    <AvailabilityForm initialData={availability || defaultAvailability} />
  )
}

export default Availability