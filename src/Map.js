import React, { Component } from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import Axios from 'axios';
import logoSvg from './logo.svg';

const API_URL = `${process.env.REACT_APP_API_URL}`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      stores: [],
    };
  }

  render() {
    const markers = this.state.stores;
    return (
      <div>
        <button onClick={this.moveToCurrentLocation}>현재 위치로 가기</button>
        <p>lat: {this.state.center._lat}</p>
        <p>lng: {this.state.center._lng}</p>
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%', // 네이버지도 가로 길이
            height: '85vh', // 네이버지도 세로 길이
          }}
          naverRef={ref => {
            this.mapRef = ref;
          }}
          onCenterChanged={center => this.setState({ center })}
        >
          {markers.map(marker => (
            <Marker
              key={marker.code}
              lat={marker.lat}
              lng={marker.lng}
              position={new window.naver.maps.LatLng(marker.lat, marker.lng)}
              onClick={event => console.log(event)} // id: given id, event: PointerEvent
              //   icon={{
              //     url: logoSvg,
              //     size: { width: 24, height: 32 },
              //     scaledSize: { width: 24, height: 32 },
              //     anchor: { x: 12, y: 32 },
              //   }}
              shape={{
                coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12],
                type: 'poly',
              }} // click mask shape
            />
          ))}
        </NaverMap>
      </div>
    );
  }

  componentDidMount() {
    this.moveToCurrentLocation();

    // var marker = new window.naver.maps.Marker({
    //     position: new window.naver.maps.LatLng(37.554722, 126.970833),
    //     map: this.mapRef.instance
    // })
  }

  moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.onSuccessGeolocation,
      this.onErrorGeolocation,
    );
  };

  onSuccessGeolocation = position => {
    console.log('getCurrentPosition success');
    this.setState({
      center: new window.naver.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      ),
    });
    this.mapRef.map.setCenter(this.state.center);
    this.mapRef.map.setZoom(16);
    console.log(this.mapRef.instance.center); // this.mapRef.map == this.mapRef.instance
    console.log(this.state.center);
    // get pharmacy data
    this.getMarkers(this.state.center._lat, this.state.center._lng);
  };

  onErrorGeolocation = () => {
    console.log('error');
  };

  getMarkers = async (lat, lng) => {
    await Axios.get(API_URL, {
      params: { lat, lng },
    })
      .then(response => {
        console.log(response.data.stores);
        this.setState({ stores: response.data.stores });
      })
      .catch(response => {
        console.log(response);
      });
  };
}

export default Map;
