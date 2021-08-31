import React from "react";

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const GoogleMaps = withScriptjs(
  withGoogleMap((props: any) => {
    return (
      <GoogleMap defaultZoom={16} defaultCenter={{ lat: 43.85689, lng: 18.39543 }}>
        {props.isMarkerShown && <Marker position={{ lat: 43.85689, lng: 18.39543 }} />}
      </GoogleMap>
    );
  })
);

export default GoogleMaps;
