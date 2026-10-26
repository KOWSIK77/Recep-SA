import { siteConfig } from './config';

export function generateIcsFile(): void {
  const event = {
    title: siteConfig.event.title,
    description: `${siteConfig.event.invitationSubtitle}\\n\\nVenue: ${siteConfig.venue.fullAddress}\\nGoogle Maps: ${siteConfig.venue.googleMapsUrl}`,
    location: siteConfig.venue.fullAddress,
    // UTC: 2026-11-01 18:00 IST = 12:30 UTC
    start: '20261101T123000Z',
    // UTC: 2026-11-01 21:30 IST = 16:00 UTC
    end: '20261101T160000Z',
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sasikumar & Adithya Reception//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:sasikumar-adithya-reception-20261101@wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Sasikumar & Adithya Wedding Reception Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'sasikumar-adithya-reception.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
