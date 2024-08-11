export interface IUserRating {
  rating_text: string;
  rating_color: string;
  votes: string;
  aggregate_rating: string;
}

export interface ILocation {
  latitude: string;
  address: string;
  city: string;
  country_id: number;
  locality_verbose: string;
  city_id: number;
  zipcode: string;
  longitude: string;
  locality: string;
}

export interface IRestaurant {
  has_online_delivery: number;
  photos_url?: string; // Optional
  url?: string; // Optional
  price_range: number;
  apikey: string;
  user_rating: IUserRating;
  name: string;
  cuisines: string;
  is_delivering_now: number;
  deeplink: string;
  menu_url?: string; // Optional
  average_cost_for_two: number;
  book_url?: string; // Optional
  switch_to_order_menu: number;
  has_table_booking: number;
  location: ILocation;
  featured_image: string;
  currency: string;
  id: string;
  thumb: string;
}
