import React from 'react';
import { Calendar } from "lucide-react";
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

export const CreateEventForm = () => {
  return (
    <Card className="w-[1200px] mx-auto">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Fill in the details below to create a new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter event title" />
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Input type="datetime-local" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Enter event location" />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select>
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
                  placeholder="Enter event description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline">
                Cancel
              </Button>
              <Button>
                Create Event
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            <ImageUpload />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;
