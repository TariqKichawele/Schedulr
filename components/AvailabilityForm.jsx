'use client';

import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { availabilitySchema } from '../lib/validators';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { timeSlots } from '../app/(main)/availability/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { updateAvailability } from '../actions/availability';
import useFetch from '../hooks/use-fetch';

const AvailabilityForm = ({ initialData }) => {

    const { handleSubmit, register, control, formState: { errors }, watch, setValue } = useForm({
        resolver: zodResolver(availabilitySchema),
        defaultValues: { ...initialData },
    });

    const { loading, error, fn: fnUpdateAvailability } = useFetch(updateAvailability);

    const onSubmit = async(data) => {
        await fnUpdateAvailability(data);
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ].map((day) => {
            const isAvailable = watch(`${day}.isAvailable`);

            return (
                <div key={day} className='flex items-center space-x-4 mb-4'>
                    <Controller 
                        name={`${day}.isAvailable`}
                        control={control}
                        render={({ field }) => (
                            <Checkbox 
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                    setValue(`${day}.isAvailable`, checked);
                                    if(!checked) {
                                        setValue(`${day}.startTime`, "09:00");
                                        setValue(`${day}.endTime`, "17:00");
                                    }
                                }}
                            />
                        )}
                    />

                    <span className='w-24'>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>

                    {isAvailable && (
                        <>
                            <Controller 
                                name={`${day}.startTime`}
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className='w-32'>
                                            <SelectValue placeholder='Select start time' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((slot) => (
                                                <SelectItem value={slot} key={slot}>
                                                    {slot}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            <span>to</span>

                            <Controller 
                                name={`${day}.endTime`}
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className='w-32'>
                                            <SelectValue placeholder='Select end time' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((slot) => (
                                                <SelectItem value={slot} key={slot}>
                                                    {slot}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors[day]?.endTime && (
                                <span className='text-red-500 text-sm ml-2'>
                                    {errors[day].endTime.message}
                                </span>
                            )}
                        </>
                    )}
                </div>
            )
        })}

        <div className='flex items-center space-x-4'>
            <span className='w-48'>Minimum gap before booking (minutes):</span>

            <Input 
                type='number'
                {...register("timeGap", {
                    valueAsNumber: true,
                })}
                className='w-32'
            />

            {errors.timeGap && (
                <span className='text-red-500 text-sm ml-2'>
                    {errors.timeGap.message}
                </span>
            )}
        </div>
        { error && <div className='text-red-500 text-sm ml-2'>{error?.message}</div> }
        <Button type='submit' disabled={loading}>
            { loading ? "Updating..." : "Update Availability" }
        </Button>
    </form>
  )
}

export default AvailabilityForm