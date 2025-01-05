import { getEvents } from "@/lib/dal";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const events = await getEvents();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Events</h1>
        <Link href="/manage-events/create" passHref legacyBehavior>
          <Button variant="default">Add New Event</Button>
        </Link>
      </div>
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <CardHeader className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-t"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Location:</strong> {event.location}
                </p>
                <Badge
                  variant={
                    event.status === "published"
                      ? "default"
                      : event.status === "draft"
                        ? "outline"
                        : "destructive"
                  }
                  className="mt-2"
                >
                  {event.status}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/manage-events/edit/${event.id}`}
                      passHref
                      legacyBehavior
                    >
                      <Button variant="default" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit this event</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete this event</TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-4">
          <CardHeader>
            <h2>No Events Found</h2>
          </CardHeader>
          <CardContent>
            <p>
              There are currently no events to display. Please add a new event
              to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
