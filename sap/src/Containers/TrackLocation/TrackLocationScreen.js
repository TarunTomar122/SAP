import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import IceCream from "../../assets/images/IceCream";

function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function getDistance(lt2, ln2) {
    lat1 = Deg2Rad(26.472390);
    lat2 = Deg2Rad(lt2);
    lon1 = Deg2Rad(ln2);
    lon2 = Deg2Rad(73.115148);
    latDiff = lat2 - lat1;
    lonDiff = lon2 - lon1;
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
            latitude: 0,
            longitude: 0,
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
            });
        });

        // every second change the latitude and longitude by a small amount
        this.interval = setInterval(() => {
            this.setState({
                latitude: this.state.latitude + 0.001,
                longitude: this.state.longitude + 0.001,
            });
        }, 1000);


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
                    >
                        {/* <Image
                            height={size.scale(20)}
                            width={size.scale(20)}
                            source={require('../../assets/images/player.png')}
                        /> */}
                        <IceCream
                            height={size.scale(50)}
                            width={size.scale(50)}
                        />
                    </Marker>
                </MapView>
            </View>
        )

        return (
            <View style={styles.home} >
                <Header
                    route={{ name: 'location' }}
                    style={styles.header}
                    leftIcon={true}
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.container}>
                    <MapView
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default Tracklocationscreen;
