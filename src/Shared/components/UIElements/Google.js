import { useEffect, useRef } from 'react';

import './Google.css';

const Google = (props) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });

    new window.google.maps.Marker({
      position: props.center,
      map: map,
    });
  }, [props.center, props.zoom]);

  return <div ref={mapRef} className="map"></div>;
};

export default Google;
