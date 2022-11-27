import { LngLat } from "../atoms";

const genRouteApiUrl = ({
  originLngLat,
  destLngLat,
}: {
  originLngLat: LngLat;
  destLngLat: LngLat;
}) =>
  `https://map.ir/routes/route/v1/driving/${originLngLat.join(
    ","
  )};${destLngLat.join(",")}`;

export default genRouteApiUrl;
