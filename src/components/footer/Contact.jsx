import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 이미지 파일을 import로 불러오기
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Marker 아이콘 이슈 해결
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact = () => {
  // 대략적인 좌표 (필요에 따라 정확한 좌표로 변경)
  const position = [37.4771, 126.8797];

  return (
    <div>
      <h1>Contact</h1>
      <div style={{ height: "400px", width: "100%", marginBottom: "20px" }}>
        <MapContainer
          center={position}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              서울 금천구 가산디지털2로 101
              <br />
              한라원앤원타워 B동 3층
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div>
        <h2>대중교통 안내</h2>
        <h3>지하철</h3>
        <p>1호선/7호선 가산디지털단지역 하차 후 도보 700m</p>
        <h3>버스</h3>
        <p>
          21, 571, 652, 금천05번
          <br />
          하차: 정류장번호 18108 (디지털3단지.월드벤쳐센터 정거장)에서 도보 300m
        </p>
      </div>
    </div>
  );
};

export default Contact;
