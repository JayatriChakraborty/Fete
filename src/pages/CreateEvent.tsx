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
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  location: z.string().min(3, "Location is required."),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
  time: z.string().min(1, "Time is required."),
  price: z.coerce.number().min(0).default(0),
  imageFile: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`),
  rsvpQuestion: z.string().optional(),
  isPrivate: z.boolean().default(false),
  collaborators: z.string().optional(),
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
      rsvpQuestion: "",
      isPrivate: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let imageUrl = '/placeholder.svg';
    if (values.imageFile && values.imageFile.length > 0) {
      const file = values.imageFile[0];
      imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const eventData = {
      ...values,
      date: format(values.date, "dd/MM/yyyy"),
      imageUrl: imageUrl,
    };
    // @ts-ignore
    delete eventData.imageFile;

    addUserEvent(eventData);
    toast.success("Event created successfully!");
    navigate("/");
  }

  return (
    <div className="p-4 md:p-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Create Your Event</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-6 md:p-10 rounded-2xl shadow-lg border border-border">
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Event Banner</FormLabel>
                <FormControl>
                  <ImageUpload name="imageFile" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            <span className="truncate">{format(field.value, "dd/MM/yyyy")}</span>
                          ) : (
                            <span></span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
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
            name="rsvpQuestion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom RSVP Question (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., What's your dietary preference?" {...field} className="bg-input"/>
                </FormControl>
                <FormDescription>
                  This question will be shown in the RSVP dialog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collaborators"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invite Collaborators (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe, John Smith" {...field} className="bg-input"/>
                </FormControl>
                <FormDescription>
                  Enter usernames separated by commas to invite them as co-hosts.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-input/30">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Private Event</FormLabel>
                  <FormDescription>
                    Only people with a direct link can view this event.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold bg-gradient-to-r from-brand-purple to-brand-pink text-white hover:opacity-90 transition-opacity transform hover:scale-[1.02]">
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
