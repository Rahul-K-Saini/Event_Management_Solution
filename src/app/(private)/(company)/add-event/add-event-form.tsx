// "use client";
// import Image from "next/image";
// import * as React from "react";
// import { Calendar } from "lucide-react";
//
// import { createEvent } from "./actions";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
//
// export function CreateEventForm() {
//   const [isPending, startTransition] = React.useTransition();
//   const [image, setImage] = React.useState<File | null>(null);
//   const { toast } = useToast();
//   const router = useRouter();
//
//   // const form = useForm<z.infer<typeof formSchema>>({
//   //   resolver: zodResolver(formSchema),
//   //   defaultValues: {
//   //     title: "",
//   //     description: "",
//   //     event_date: "",
//   //     location: "",
//   //     status: "DRAFT",
//   //   },
//   // });
//
//   async function onSubmit() {
//     startTransition(async () => {
//       const formData = new FormData();
//       // Object.entries(values).forEach(([key, value]) => {
//       //   formData.append(key, value);
//       // });
//       // if (image) {
//       //   formData.append("image", image);
//       // }
//       //
//       const result = await createEvent(formData);
//       if (result.success) {
//         toast({
//           title: "Success",
//           description: "Event created successfully",
//         });
//         router.push("/events");
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: result.error,
//         });
//       }
//     });
//   }
//
//   return (
//     <Card className="w-full max-w-7xl mx-auto">
//       <CardHeader>
//         <CardTitle>Create New Event</CardTitle>
//         <CardDescription>
//           Fill in the details below to create a new event.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form >
//           <form  className="space-y-8">
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-4">
//                 <FormField
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter event title" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Give your event a clear and descriptive title
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   name="event_date"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Date</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input type="datetime-local" {...field} />
//                           <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   name="location"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Location</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter event location" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Status</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select status" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="DRAFT">Draft</SelectItem>
//                           <SelectItem value="PUBLISHED">Published</SelectItem>
//                           <SelectItem value="CANCELLED">Cancelled</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//
//               <div className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter event description"
//                           className="min-h-[150px]"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   name="image"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Event Image</FormLabel>
//                       <FormControl>
//                         <div className="grid gap-4">
//                           <Input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => {
//                               const file = e.target.files?.[0];
//                               if (file) setImage(file);
//                             }}
//                             className="cursor-pointer"
//                           />
//                           {image && (
//                             <div className="relative aspect-video rounded-lg border border-border bg-muted">
//                               <Image
//                                 width={1000}
//                                 height={1000}
//                                 src={URL.createObjectURL(image)}
//                                 alt="Preview"
//                                 className="rounded-lg object-cover"
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </FormControl>
//                       <FormDescription>
//                         Upload an image for your event. Recommended size:
//                         1200x630px
//                       </FormDescription>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//
//             <div className="flex justify-end gap-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? "Creating..." : "Create Event"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
