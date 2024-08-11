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
import RestaurantList from "@/components/restaurant-list";
import { SetStateAction, useEffect, useState } from "react";
import {
  getRestaurants,
  searchNearbyRestaurants,
  searchRestaurants,
} from "@/api/restaurants";
import { useQuery } from "@tanstack/react-query";
import { IRestaurant } from "@/lib/types";
const formSchema = z.object({ city: z.string().min(1).max(255) });

export function LocationSearchForm({
  setRestaurants,
  page,
  setPage,
}: {
  setRestaurants: React.Dispatch<SetStateAction<any>>;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPage(1);
    const res = await searchRestaurants(values.city, String(page));
    if (res) {
      setRestaurants(res);
    }
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

export interface State {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    restaurants: IRestaurant[];
  };
}
const Homepage = () => {
  const [page, setPage] = useState<number>(1);
  const [restaurants, setRestaurants] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ["restaurants", page],
    queryFn: () => getRestaurants(String(page)),
    // placeholderData: keepPreviousData,
  });

  useEffect(() => setRestaurants(data), [data]);

  async function setLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const nearbyRestaurants = await searchNearbyRestaurants(
        String(position.coords.latitude),
        String(position.coords.longitude),
      );
      if (nearbyRestaurants) {
        setRestaurants(nearbyRestaurants);
      }
    });
  }

  return (
    <div>
      <div className="flex justify-center ">
        <LocationSearchForm
          setRestaurants={setRestaurants}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="flex justify-center py-4">
        <p className="text-gray-400"> --------- or --------</p>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => setLocation()}
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
        <RestaurantList page={page} setPage={setPage} data={restaurants} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Homepage,
});

