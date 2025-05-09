import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

export function removeUnderscore(str: string): string {
  if (!str) return "";
  let result = str.replace(/_/g, " ");
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
}

("use client");

/**
 * Retrieves latitude and longitude coordinates for a given address using geocoding services.
 *
 * @param {string} address - The address to geocode.
 * @returns {Promise<{latitude: number, longitude: number}>}
 * A promise that resolves to an object containing the latitude and longitude.
 * If the address cannot be geocoded, returns an object with default coordinates `{ latitude: -1, longitude: -1 }`.
 *
 * @throws {Error} Throws an error if no geocoding results are found.
 *
 * @example
 * const location = await getCoordinatesFromAddress("1600 Amphitheatre Parkway, Mountain View, CA");
 * console.log(location); // { latitude: 37.422, longitude: -122.084 }
 */
export const getCoordinatesFromAddress = async (
  address: string
): Promise<{ latitude: number; longitude: number }> => {
  try {
    const results = await geocodeByAddress(address);
    if (results.length === 0) {
      throw new Error("No results found");
    }
    const { lat, lng } = await getLatLng(results[0]);
    return { latitude: lat, longitude: lng };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    console.error(errorMessage);
    return { latitude: -1, longitude: -1 };
  }
};
