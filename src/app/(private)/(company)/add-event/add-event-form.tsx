"use client";
import { Calendar, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from './uploadImage';
import { useActionState } from "react";
import { createEvent } from "./actions";

export const CreateEventForm = () => {
  const [state, createEventAction, isPending] = useActionState(createEvent, {
    sucess: false,
    errors: null
  });
  return (
    <Card className="md:w-[1200px] w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Fill in the details below to create a new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createEventAction} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter event title" name="title" />
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Input type="datetime-local" name="event_date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Enter event location" name="location" />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select name="status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  placeholder="Enter event description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="space-y-4">
              <ImageUpload />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" className="" disabled={isPending}>{isPending && <Loader2 className="animate-spin" />}Create Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;
