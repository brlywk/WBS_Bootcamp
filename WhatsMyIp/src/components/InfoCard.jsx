/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ClockIcon as ClockIconSolid } from "@heroicons/react/24/solid";
import useLocationInfo from "../hooks/useLocationInfo";
import Loading from "../components/Loading";

const InfoCard = ({ geoData }) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [now, setNow] = useState(null);

  // hooks
  const { getCountryInfo } = useLocationInfo();

  // country data
  useEffect(() => {
    if (!geoData) return;

    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    getCountryInfo(geoData.country)
      .then((result) => {
        setIsLoading(false);
        setHasError(false);
        setErrorMessage("");

        setCountryInfo(result);
        setNow(DateTime.now());
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(error.message);
      });

    // DEBUG
    // setIsLoading(false);
    // setCountryInfo({ name: "Germany", flagUrl: "https://flagcdn.com/de.svg" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData]);

  console.log("CountryInfo: ", countryInfo);

  return (
    <div className="w-full h-full flex justify-center items-center z-[9999] inset-0 fixed">
      <div className="w-1/3  border border-black/25 rounded-xl shadow-lg relative">
        {/* Card Backdrop */}
        <div className="w-full h-full absolute inset-0 backdrop-blur-md -z-10"></div>
        {/* Loading */}
        {isLoading && <Loading />}

        {/* Card Content */}
        {/*  Loaded */}
        {!isLoading && !hasError && (
          <div className="flex flex-col divide-y divide-black/25 inset-0 relative h-full">
            {/* IP */}
            <div className="flex flex-none justify-center items-center font-bold text-lg p-2">
              Your IP address is {geoData.ip}
            </div>

            {/* Country & City */}
            <div className="flex-auto flex p-2 gap-4">
              <div className="w-1/3">
                {countryInfo.flagUrl && <img src={countryInfo.flagUrl} alt={countryInfo.name} className="h-full" />}
              </div>
              <div className="flex flex-col w-full items-start justify-start">
                <div className="font-bold mb-2">Your current location</div>
                <div className="mb-2">
                  {geoData.city}, {countryInfo.name}{" "}
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
                  <div>Latitude:</div>
                  <div>{geoData.lat}</div>
                  <div>Longitude:</div>
                  <div>{geoData.lng}</div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="p-2 flex-none">
              <div className="grid gap-y-2 gap-x-4 grid-cols-[auto_max-content_1fr] items-center">
                <CalendarDaysIcon className="h-5" />
                <div className="flex flex-grow">Local date:</div>
                <div>{now.toLocaleString()}</div>
                <ClockIcon className="h-5" />
                <div>Local time:</div>
                <div>
                  {now.toLocaleString({ hour: "2-digit", minute: "2-digit" })} (UTC {geoData.timezone})
                </div>
                <ClockIconSolid className="h-5" />
                <div>UTC time:</div>
                <div>{now.toUTC().toLocaleString({ hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && hasError && <div>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default InfoCard;
