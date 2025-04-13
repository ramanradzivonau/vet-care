import { useEffect, useState } from "react";
import GetLocation, {
  isLocationError,
  Location,
  LocationErrorCode,
} from "react-native-get-location";

export const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationErrorCode | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setLocation(null);
    setError(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: "Location permission",
        message: "The app needs the permission to request your location.",
        buttonPositive: "Ok",
      },
    })
      .then(newLocation => {
        setIsLoading(false);
        setLocation(newLocation);
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const { code, message } = ex;
          console.warn(code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
        setIsLoading(false);
        setLocation(null);
      });
  }, []);

  return {
    isLoading,
    location,
    error,
  };
};
