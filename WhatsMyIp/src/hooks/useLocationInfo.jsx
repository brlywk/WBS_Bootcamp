const useLocationInfo = () => {
  // Get geo location data
  const getGeoLocation = async () => {
    const url = new URL("https://geo.ipify.org/api/v2/country,city");
    const apiKey = import.meta.env.VITE_GEO_IP_KEY;

    url.searchParams.append("apiKey", apiKey);

    const apiResponse = await fetch(url.href);
    const data = await apiResponse.json();

    return {
      ip: data.ip,
      isp: data.isp,
      city: data.location.city,
      country: data.location.country,
      region: data.location.region,
      lat: data.location.lat,
      lng: data.location.lng,
      timezone: data.location.timezone,
    };
  };

  // get info about country
  const getCountryInfo = async (countryCode) => {
    const url = "https://restcountries.com/v3.1/alpha/" + countryCode;

    try {
      const apiResponse = await fetch(url);
      const data = await apiResponse.json();

      if (!data || data.length === 0)
        throw new Error(`Response from REST Countries did not contain any data for country code ${countryCode}`);

      const country = data.pop();

      return {
        name: country.name.common,
        flagUrl: country.flags.svg,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getGeoLocation, getCountryInfo };
};

export default useLocationInfo;
