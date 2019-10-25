import React from 'react';
import { Text, View, Button, AsyncStorage, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';
import ItemWeather from '../components/ItemWeather';

class FavoritesPage extends React.Component {

    static navigationOptions = (data) => {
        const { navigation } = data;
        return {
            title: 'Favoris',
            headerRight: (
                <Icon size={25} name={'ios-add'}
                    onPress={() => {
                        if (navigation.state.params.count < 16) {
                            navigation.push('AddFavorites');
                        }
                    }} />
            )
        }
    };

    state = { cities: [], refreshing: false };

    onAddPress() {
        this.props.navigation.navigate('AddFavorites');
    }

    componentDidMount() {

        //this.refresh();
        /*this.setState({
            cities: [
                { name: 'Marseille', temp: 29, main: 'clear' },
                { name: 'New York', temp: 13, main: 'clear' },
                { name: 'Pekin', temp: 12, main: 'clear' }
            ]
        });*/
    }

    refresh() {
        this.setState({ refreshing: true });
        AsyncStorage.getItem('cities').then((data) => {
            this.props.navigation.setParams({ count: JSON.parse(data).length });
            this.setState({ cities: JSON.parse(data).sort(), refreshing: false });

            //console.log(data);
        });
    }

    deleteCity(cityName) {
        let tab = [...this.state.cities];
        tab.splice(tab.findIndex(e => e === cityName), 1);
        AsyncStorage.setItem('cities', JSON.stringify(tab))
            .then(() => {
                this.props.navigation.setParams({ count: tab.length });
                this.setState({ cities: tab });
            });
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => this.refresh()} />
                <FlatList data={this.state.cities}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}
                        onRefresh={() => this.refresh()} />}
                    renderItem={(element) => (

                        <ItemWeather key={element.item} city={element.item}
                            onDelete={(city) => this.deleteCity(city)} />

                    )} />
                <Button title="Ajouter" onPress={() => this.onAddPress()} />
            </View>
        );
    }
}

export default FavoritesPage;