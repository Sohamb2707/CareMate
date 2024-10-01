import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for data fetching
import remainder from '../assets/remainder.mp3'; // Reminder sound

const ReadOnlyInfoDisplay = () => {
    const [medications, setMedications] = useState([]);
    const [appointmentDates, setAppointmentDates] = useState({});
    const [dailyRoutine, setDailyRoutine] = useState({});
    const [reminderInterval, setReminderInterval] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Play reminder sound
    const playReminderSound = () => {
        const audio = new Audio(remainder);
        audio.play();
    };

    // Show popup reminder
    const showPopupReminder = (message) => {
        alert(message); // Can be enhanced with a custom modal
    };

    // Set reminder for medications or appointment
    const setReminder = (time, name, type) => {
        const currentTime = new Date();
        const eventTime = new Date();
        const [hours, minutes] = time.split(':');
        eventTime.setHours(hours, minutes, 0, 0);

        const timeDifference = (eventTime - currentTime) / (1000 * 60); // Difference in minutes

        if (timeDifference <= 30 && timeDifference >= 0) {
            const message = `${type} Reminder: ${name} is scheduled in ${Math.floor(timeDifference)} minutes!`;
            showPopupReminder(message);
            playReminderSound();
        }
    };

    // Start reminders
    const startReminders = () => {
        const interval = setInterval(() => {
            medications.forEach(medication => {
                setReminder(medication.time, medication.name, 'Medication');
            });

            if (appointmentDates.time) {
                setReminder(appointmentDates.time, appointmentDates.type, 'Appointment');
            }
        }, 60000); // Check every minute

        setReminderInterval(interval);
    };

    // Stop reminders
    const stopReminders = () => {
        clearInterval(reminderInterval);
    };

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments/latest');
                const data = response.data;

                console.log("Fetched Data:", data);

                setMedications(data.medications || []);
                setAppointmentDates({
                    date: data.nextAppointmentDate || '',
                    time: data.nextAppointmentTime || '',
                    type: data.appointmentType || ''
                });
                setDailyRoutine({
                    activities: data.dailyActivities || '',
                    diet: data.diet || '',
                    sleep: data.sleepSchedule || ''
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Start reminders when medications or appointment data changes
    useEffect(() => {
        if (medications.length > 0 || appointmentDates.time) {
            startReminders();
        }
    }, [medications, appointmentDates]);

    // Format date and time for display
    const formatAppointmentDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    };

    const formatAppointmentTime = (time) => {
        if (!time) return '';
        const [hour, minute] = time.split(':');
        const formattedTime = new Date(`1970-01-01T${hour}:${minute}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-400">
            {loading ? (
                <div className="text-2xl text-gray-700 font-bold">Loading...</div>
            ) : error ? (
                <div className="text-2xl text-red-600 font-bold">{error}</div>
            ) : (
                <div className="bg-white p-10 rounded-lg shadow-lg mt-10 w-3/4 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Schedule</h2>

                    {/* Medications Section */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-semibold text-gray-700 mb-2">Medications:</h3>
                        {medications.length > 0 ? (
                            <ul className="list-disc pl-8 text-xl text-gray-600">
                                {medications.map((med, index) => (
                                    <li key={index}>
                                        <strong>{med.name}</strong> - {med.dose} at {formatAppointmentTime(med.time)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xl text-gray-600">No medications scheduled.</p>
                        )}
                    </div>

                    {/* Appointment Section */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-semibold text-gray-700 mb-2">Next Appointment:</h3>
                        {appointmentDates.date ? (
                            <p className="text-xl text-gray-600">
                                {appointmentDates.type} on {formatAppointmentDate(appointmentDates.date)} at {formatAppointmentTime(appointmentDates.time)}
                            </p>
                        ) : (
                            <p className="text-xl text-gray-600">No upcoming appointments.</p>
                        )}
                    </div>

                    {/* Daily Routine Section */}
                    <div>
                        <h3 className="text-3xl font-semibold text-gray-700 mb-2">Daily Routine:</h3>
                        <p className="text-xl text-gray-600"><strong>Activities:</strong> {dailyRoutine.activities}</p>
                        <p className="text-xl text-gray-600"><strong>Diet:</strong> {dailyRoutine.diet}</p>
                        <p className="text-xl text-gray-600"><strong>Sleep Schedule:</strong> {dailyRoutine.sleep}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReadOnlyInfoDisplay;
