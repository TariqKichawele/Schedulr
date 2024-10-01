'use client';

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '../lib/validators';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { format } from 'date-fns';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { createBooking } from '../actions/bookings';
import useFetch from '../hooks/use-fetch';
 
const BookingForm = ({ event, availability }) => {
    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedTime, setSelectedTime ] = useState(null);

    const availableDays = availability.map((day) => new Date(day.date));

    const timeSlots = selectedDate 
        ? availability.find((day) => day.date === format(selectedDate, 'yyyy-MM-dd'))?.slots || []
        : [];

    useEffect(() => {
        if(selectedDate) {
            setValue("date", format(selectedDate, 'yyyy-MM-dd'));
        }
    }, [selectedDate])

    useEffect(() => {
        if(selectedTime) {
            setValue("time", selectedTime);
        }
    }, [selectedTime])

    const { loading, data, fn: fnCreateBooking } = useFetch(createBooking)
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(bookingSchema)
    });

    const onSubmit = async (data) => {
        if(!selectedDate || !selectedTime) {
            console.error("Please select a date and time");
            return;
        }

        const startTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`);
        const endTime = new Date(startTime.getTime() + event.duration * 60000);

        const bookingData = {
            eventId: event.id,
            name: data.name,
            email: data.email,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            additionalInfo: data.additionalInfo,
        };

        await fnCreateBooking(bookingData);
    }

    if(data) {
        return (
            <div className='text-center p-10 border bg-white'>
                <h2>Booking Successful</h2>
                {data.meetLink && (
                    <p>
                        Join the meeting: {" "}
                        <a href={data.meetLink} className='text-blue-500 hover:underline' target='_blank' rel='noopener noreferrer'>
                            {data.meetLink}
                        </a>
                    </p>
                )}
            </div>
        )
    }

    return (
    <div className='flex flex-col gap-8 p-10 border bg-white'>
        <div className='md:h-96 flex flex-col md:flex-row gap-5'>
            <div className='w-full'>
                <DayPicker 
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                    }}
                    disabled={[{ before: new Date() }]}
                    modifiers={{
                        available: availableDays,
                    }}
                    modifiersStyles={{
                        available: {
                            background: "lightblue",
                            borderRadius: 100,
                        }
                    }}
                />
            </div>
            <div className='w-full h-full md:overflow-scroll no-scrollbar'>
                {selectedDate && (
                    <div className='mb-4'>
                        <h3 className='text-lg font-semibold mb-2'>Available Time Slots</h3>
                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                            {timeSlots.map((slot) => {
                                return (
                                    <Button 
                                        onClick={() => setSelectedTime(slot)} 
                                        key={slot}
                                    variant={selectedTime === slot ? "default" : "outline"}
                                >
                                    {slot}
                                </Button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {selectedTime && (
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input {...register('name')} placeholder='Name' />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div>
                    <Input {...register('email')} placeholder='Email' />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div>
                    <Textarea {...register('additionalInfo')} placeholder='Additional Information' />
                </div>
                <Button type='submit' disabled={loading} className='w-full'>
                    {loading ? "Scheduling..." : "Schedule Event"}
                </Button>
            </form>
        )}
    </div>
  )
}

export default BookingForm