import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import Running from "../../assets/images/Running.svg";

function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function getDistance(lt2, ln2) {
    var lat1 = Deg2Rad(26.4720864);
    var lat2 = Deg2Rad(lt2);
    var lon1 = Deg2Rad(ln2);
    var lon2 = Deg2Rad(73.1152852);
    var latDiff = lat2 - lat1;
    var lonDiff = lon2 - lon1;
    var R = 6371000; // metres
    var φ1 = lat1;
    var φ2 = lat2;
    var Δφ = latDiff;
    var Δλ = lonDiff;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    var dist = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
    return dist;
}

class Tracklocationscreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 26.472233,
            longitude: 73.1149932,
            distance: 0,
            heading: 0,
        };
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.refreshScreen();
        });

        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                distance: getDistance(info.coords.latitude, info.coords.longitude),
                heading: info.coords.heading == -1 ? this.state.heading : info.coords.heading,
            });
        });

        // watch location changes
        this._watchId = Geolocation.watchPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                distance: getDistance(info.coords.latitude, info.coords.longitude),
                heading: info.coords.heading == -1 ? this.state.heading : info.coords.heading,
            });
        }, error => {
            console.log(error);
        },
            {
                enableHighAccuracy: true,
                distanceFilter: 1,
                interval: 1000,
                fastestInterval: 1000,
                timeout: 1000,
            });
    }
    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) { }
    }

    async refreshScreen() { }

    render() {

        return (
            <View style={styles.home} >
                <Header
                    route={{ name: 'location' }}
                    style={styles.header}
                    leftIcon={true}
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <Text style={styles.title}>Track Location</Text>
                <Text style={styles.subtitle}>Latitude: {this.state.latitude}</Text>
                <Text style={styles.subtitle}>Longitude: {this.state.longitude}</Text>
                <Text style={styles.subtitle}>Distance from home: {this.state.distance}</Text>
                <Text style={styles.subtitle}>Amgle: {this.state.heading}</Text>
                <View style={styles.mapView}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                            rotation={this.state.heading}
                        >

                            <Running
                                height={size.scale(80)}
                                width={size.scale(80)}
                            />
                        </Marker>
                    </MapView>
                </View>
            </View>
        );

    }
}

export default Tracklocationscreen;
