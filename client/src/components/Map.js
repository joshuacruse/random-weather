import React from 'react'
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl
} from 'react-map-gl';
import marker from '../img/ico/marker.png'
import clouds from '../img/ico/weather/clouds.svg'
import snow from '../img/ico/weather/snow.svg'
import clear from '../img/ico/weather/clear.svg'
import rain from '../img/ico/weather/rain.svg'
import mist from '../img/ico/weather/mist.svg'


class Map extends React.Component {

    state = {
      viewport: {
        width: '100vw',
        height: 500,
        latitude: 30,
        longitude: 0,
        zoom: 1
      },
      selectedPoint: null
    }

    render() {

      const icons = {
        "Clouds": clouds,
        "Snow": snow,
        "Clear": clear,
        "Rain": rain,
        "Mist": mist
      }

      const capitalize = (str) => {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      return (
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken = 'pk.eyJ1IjoiamNydXNlMTIzIiwiYSI6ImNrNzJwdjZlYjAwYzgzbG1taDkwMGw1enEifQ.JT2i-Aij0f1xNy1eEBcSCg'
          mapStyle = 'mapbox://styles/mapbox/streets-v9'
          transitionDuration={0}
        >
        <div style={{position: 'absolute', left: 5, top: 5}}>
          <NavigationControl
            showCompass={false}
          />
        </div>
        {this.props.weatherPoints.map(weatherPoint => (
          <Marker
            key={weatherPoint.coord.lat / weatherPoint.coord.lon}
            latitude={weatherPoint.coord.lat}
            longitude={weatherPoint.coord.lon}
          >
            <input
              type="image"
              alt="map marker"
              height="30"
              width="30"
              src={marker}
              onClick={e => {
                e.preventDefault();
                this.setState({
                  selectedPoint: weatherPoint
                });
              }}
            />
          </Marker>
        ))}

        {this.state.selectedPoint ? (
          <Popup
            latitude={this.state.selectedPoint.coord.lat}
            longitude={this.state.selectedPoint.coord.lon}
            onClose={() => {
              this.setState({selectedPoint: null});
            }}
          >
            <div>
              <img
                className="mt-0 mb-0"
                width="60"
                height="60"
                alt="weather"
                src={icons[this.state.selectedPoint.weather[0].main]}
              />

              <p className="mb-1 mt-1">Conditions: {capitalize(this.state.selectedPoint.weather[0].description)}</p>
              <p className="mb-1 mt-1">Temperature: {(this.state.selectedPoint.main.temp - 273.15).toFixed(2)} °C</p>
              <p className="mb-1 mt-1">Humidity: {this.state.selectedPoint.main.humidity}</p>
              <p className="mb-1 mt-1">Wind Speed: {this.state.selectedPoint.wind.speed}</p>
              <hr className="mb-1 mt-2" />
              <p className="mb-1 mt-1">Latitude: {this.state.selectedPoint.coord.lat}</p>
              <p className="mb-1 mt-1">Longitude: {this.state.selectedPoint.coord.lon}</p>
            </div>
          </Popup>
        ) : null}
        </ReactMapGL>
      );
    }
  }

export default Map