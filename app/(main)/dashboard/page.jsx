'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useForm } from 'react-hook-form'
import { usernameSchema } from '../../../lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetch from '../../../hooks/use-fetch'
import { updateUsername } from '../../../actions/users'
import { BarLoader } from 'react-spinners'
import { getLatestUpdates } from '../../../actions/dashboard'
import { format } from 'date-fns'

const Dashboard = () => {
    const { isLoaded, user } = useUser();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(usernameSchema)
    });

    useEffect(() => {
        setValue('username', user?.username)
    }, [isLoaded])

    const { fn: fnUpdateUsername, error, loading } = useFetch(updateUsername);

    const onSubmit = async (data) => {
        await fnUpdateUsername(data.username);
    }

    const { loading: loadingUpdates, data: upcomingMeetings , fn: fnUpdates } = useFetch(getLatestUpdates);
    useEffect(() => {
        (async () => await fnUpdates())();
    }, []);

  return (
    <div className='space-y-8'>
        <Card>
            <CardHeader>
                <CardTitle>Welcome, {user?.firstName}</CardTitle>
            </CardHeader>
            <CardContent>
                {!loadingUpdates ? (
                    <div className='space-y-6 font-light'>
                        <div>
                            {upcomingMeetings && upcomingMeetings?.length > 0 ?  (
                                <ul className='list-disc pl-5'>
                                    {upcomingMeetings?.map((meeting) => (
                                        <li key={meeting.id}>
                                            {meeting.event.title} on {" "}
                                            {format(
                                                new Date(meeting.startTime),
                                                "MMM dd, yyyy hh:mm a"
                                            )}{" "}
                                            with {meeting.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No upcoming meetings</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading Upcoming Meetings...</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Unique Link</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='flex items-center gap-2'>
                            <span>{window?.location.origin}</span>
                            <Input placeholder='username' {...register('username')} />
                        </div>
                    </div>
                    {errors.username && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.username.message}
                        </p>
                    )}
                    {loading && (
                        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
                    )}
                    {error && ( 
                        <p className='text-red-500 text-sm mt-1'>{error?.message}</p>
                    )}
                    <Button type='submit' disabled={loading}>
                        Update Username
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default Dashboard