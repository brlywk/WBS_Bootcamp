import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import useLocationInfo from "./hooks/useLocationInfo";
import Loading from "./components/Loading";
import InfoCard from "./components/InfoCard";

function App() {
  // state
  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // derived
  const position = geoData && [geoData.lat, geoData.lng];

  // hooks
  const { getGeoLocation } = useLocationInfo();

  // load data
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    getGeoLocation()
      .then((result) => {
        setIsLoading(false);
        setErrorMessage("");
        setHasError(false);

        setGeoData(result);
        console.log(geoData);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(error.errorMessage);
      });

    // DEBUG
    // setIsLoading(false);
    // setGeoData({
    //   ip: "93.104.71.226",
    //   isp: "M-net Telekommunikations GmbH",
    //   city: "Unterföhring",
    //   country: "DE",
    //   region: "Bavaria",
    //   lat: 48.19253,
    //   lng: 11.64293,
    //   timezone: "+02:00",
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("GeoData: ", geoData);

  return (
    <>
      {/* Loading */}
      {isLoading && <Loading />}

      {/* Map & all that */}
      {!isLoading && !hasError && (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}

      {/* Error */}
      {!isLoading && hasError && <div>{errorMessage}</div>}

      {/* Test */}
      <InfoCard geoData={geoData} />
    </>
  );
}

export default App;
