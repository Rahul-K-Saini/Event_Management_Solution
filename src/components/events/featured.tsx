  import EventCard from "@/components/events/card";
  import { cache } from 'react';
  import { Event } from '@/types/event';

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2023',
      date: '2023-09-15',
      location: 'San Francisco, CA',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      description: 'A conference showcasing the latest in technology trends and innovations.',
      isPast: false,
    },
    {
      id: '2',
      title: 'Web Development Workshop',
      date: '2023-10-01',
      location: 'New York, NY',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Hands-on workshop covering modern web development techniques and best practices.',
      isPast: false,
    },
    {
      id: '3',
      title: 'AI Symposium',
      date: '2023-11-12',
      location: 'London, UK',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      description: 'An in-depth exploration of artificial intelligence and its applications across various industries.',
      isPast: false,
    },
    {
      id: '4',
      title: 'Data Science Summit 2023',
      date: '2023-06-20',
      location: 'Boston, MA',
      imageUrl: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a',
      description: 'A summit focused on the latest trends and advancements in data science and analytics.',
      isPast: true,
    }
  ];

  async function fetchEvents(): Promise<Event[]> {
    // to see the cards faking the api call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
  }

  export const getEvents = cache(async () => {
    const events = await fetchEvents();
    return events;
  });

  interface EventSectionProps {
    title: string;
    events: Event[];
    isPast: boolean;
  }

  export default async function FeaturedEvents() {
    const events = await getEvents();

    const upcomingEvents = events.filter((event: Event) => !event.isPast).slice(0, 3);

    const pastEvents = events.filter((event: Event) => event.isPast).slice(0, 3);

    const EventSection = ({ title, events, isPast }: EventSectionProps) => (
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 font-inter">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: Event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
              description={event.description}
              isPast={isPast}
            />
          ))}
        </div>
      </div>
    );

    return (
      <div className="container px-4">
        <h2 className="text-4xl underline-offset-4 underline font-extrabold text-center mb-12 dark:text-gray-50 text-gray-800">
          Featured Events
        </h2>
        <div className="mx-auto max-w-7xl">
          <EventSection
            title="Upcoming Events"
            events={upcomingEvents}
            isPast={false}
          />
          <EventSection title="Past Events" events={pastEvents} isPast={true} />
        </div>
      </div>
    );
  }
