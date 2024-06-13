import { FC, Fragment } from "react";
import {
  FeatureLayer,
  Graphic,
  Map,
  MapView,
  VectorTileLayer,
} from "./ArcGisMap";
import { useQuery } from "@tanstack/react-query";
import { getTransportLocationList } from "../api/location";
import { DateTime } from "luxon";

const fieldsContent = {
  type: "fields",
  fieldInfos: [
    {
      fieldName: "name",
      label: "Название",
    },
    {
      fieldName: "updated_time",
      label: "Время обновления",
    },
    {
      fieldName: "transport_id",
      label: "ID транспорта",
    },
    {
      fieldName: "repair",
      label: "На ремонте",
    },
    {
      fieldName: "gos_num",
      label: "Гос. номер",
    },
  ],
};

export const MapWidget: FC = () => {
  const location = useQuery({
    queryFn: getTransportLocationList,
    queryKey: ["getTransportLocationList"],
    refetchInterval: 1000 * 10,
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map>
        <MapView
          style={{ width: "100%", height: "100%" }}
          zoom={15}
          center={[76.8829, 43.238]}
          popupEnabled
          ui={{ components: [] }}
        >
          <VectorTileLayer url="https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_v2/VectorTileServer" />
          {/* <FeatureLayer url="https://almaty.kazaerospace.kz/server/rest/services/Hosted/%D0%9C%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B/FeatureServer" /> */}
          {location.data?.data.map((item) => (
            <Fragment key={item.id}>
              <Graphic
                popupTemplate={{
                  content: [fieldsContent],
                }}
                geometry={{
                  // @ts-expect-error
                  type: "point",
                  longitude: item.actual_lng,
                  latitude: item.actual_lat,
                }}
                attributes={{
                  ...item.route,
                  repair: item.route.repair === 0 ? "НЕТ" : "ДА",
                  updated_time: DateTime.fromISO(item.updated_time, {
                    setZone: true,
                  }).toFormat("dd.MM.yyyy HH:mm:ss"),
                }}
                symbol={{
                  // @ts-expect-error
                  type: "text",
                  color: "black",
                  haloColor: "white",
                  haloSize: 1,
                  text: item.route.name,
                  yoffset: 12,
                  font: {
                    size: 12,
                    weight: "normal",
                  },
                }}
              />
              <Graphic
                popupTemplate={{
                  content: [fieldsContent],
                }}
                geometry={{
                  // @ts-expect-error
                  type: "point",
                  longitude: item.actual_lng,
                  latitude: item.actual_lat,
                }}
                attributes={{
                  ...item.route,
                  repair: item.route.repair === 0 ? "НЕТ" : "ДА",
                  updated_time: DateTime.fromISO(item.updated_time, {
                    setZone: true,
                  }).toFormat("dd.MM.yyyy HH:mm:ss"),
                }}
                symbol={{
                  // @ts-expect-error
                  type: "picture-marker",
                  url: "/bus.png",
                  width: "25px",
                  height: "25px",
                  text: item.route.name,
                }}
              />
            </Fragment>
          ))}
        </MapView>
      </Map>
    </div>
  );
};
