import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";

export const GetRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurants = await Restaurant.find().limit(20);
    return res.json(restaurants);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const GetRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findOne({ id });

    return res.status(200).json(restaurant);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Haversine formula to calculate distance between two lat/lon points
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
//
// type LocationInput = {
//   latitude: string;
//   longitude: str;
//   radius: number;
// };

export const searchRestaurantsByLocation = async (
  req: Request,
  res: Response,
) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const lat = parseFloat(latitude as string);
  const lon = parseFloat(longitude as string);
  console.log(lat, "latitude");

  await Restaurant.find()
    .then((restaurants) => {
      const nearbyRestaurants = restaurants.filter((restaurant) => {
        const distance = haversine(
          lat,
          lon,
          parseFloat(restaurant.location?.latitude),
          parseFloat(restaurant.location?.longitude),
        );
        return distance <= 3;
      });
      res.status(200).json(nearbyRestaurants);
    })
    .catch((error) => {
      console.error("Error querying restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export const searchRestaurants = async (req: Request, res: Response) => {
  const city: string = req.body.city.toLowerCase();

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    // const restaurants = await Restaurant.find({ "location.city": city });
    const restaurants = await Restaurant.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $toLower: "$location.city" }, city],
          },
        },
      },
    ]);
    return res.status(200).json(restaurants);
  } catch (err) {
    return res.status(400).json(err);
  }
};
