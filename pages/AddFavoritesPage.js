import React from 'react';
import { Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WeatherService from '../services/weather-service';


class AddFavoritesPage extends React.Component {

    static navigationOptions = {
        title: 'Ajouter une ville'
    };

    serv = new WeatherService();

    state = {
        cityName: ''
    };

    changeText(value) {
        this.setState({ cityName: value });
    }

    onPressAdd() {
        this.serv.getWeatherHome(this.state.cityName).then(resp => {
            AsyncStorage.getItem('cities').then(data => {
                let tab = [];
                if (data !== null) {
                    tab = JSON.parse(data);
                }
                tab.push(this.state.cityName);
                AsyncStorage.setItem('cities', JSON.stringify(tab))
                    .then(() => {
                        this.props.navigation.goBack();
                    })
                    .catch((err) => {
                        alert(err);
                    });
            });
        }).catch(err => {
            alert(`Pas de données pour la ville ${this.state.cityName}`);
        });
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput onChangeText={(text) => this.changeText(text)} />
                <Button title="Ajouter" onPress={() => this.onPressAdd()} />

            </View>
        );
    }
}

export default AddFavoritesPage;