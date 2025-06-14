
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserEvents } from "@/contexts/UserEventsContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  location: z.string().min(3, "Location is required."),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
  time: z.string().min(1, "Time is required."),
  price: z.coerce.number().min(0).default(0),
  imageUrl: z.string().url("Please enter a valid image URL."),
  rsvpQuestion: z.string().optional(),
});

const CreateEvent = () => {
  const { addUserEvent } = useUserEvents();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      time: "",
      price: 0,
      imageUrl: "",
      rsvpQuestion: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const eventData = {
      ...values,
      date: format(values.date, "PPP"),
    };
    addUserEvent(eventData);
    toast.success("Event created successfully!");
    navigate("/");
  }

  return (
    <div className="p-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Create Event</h1>
      <p className="text-muted-foreground mt-2">Fill out the form below to create your new event.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Event" {...field} className="bg-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about your event..." {...field} className="bg-input"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="New York, NY" {...field} className="bg-input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0 for free events" {...field} className="bg-input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-input",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} className="bg-input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.png" {...field} className="bg-input"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rsvpQuestion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom RSVP Question (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., What's your favorite song?" {...field} className="bg-input"/>
                </FormControl>
                <FormDescription>
                  This question will be shown in the RSVP dialog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Event</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
