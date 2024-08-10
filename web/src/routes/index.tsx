import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({ city: z.string().min(1).max(255) });

export function LocationSearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 items-center border-[1px] px-2 rounded-md"
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  className="p-6 w-[40rem] border-none "
                  placeholder="Enter your city or locality"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="p-6">
          Submit
        </Button>
      </form>
    </Form>
  );
}

const Homepage = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <LocationSearchForm />
      </div>
      <div className="flex justify-center py-4">
        <p className="text-gray-400"> --------- or --------</p>
      </div>
      <div className="flex justify-center">
        <Button
          variant={"expandIcon"}
          Icon={Navigation}
          iconPlacement="left"
          className="p-6"
        >
          <p className="group-hover:p-4 transition-all duration-300">
            Use My Current Location
          </p>
        </Button>
      </div>

      <div className="mt-20">
        <div className="text-3xl font-semibold">Popular Restaurants</div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Homepage,
});

