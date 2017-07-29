/**
 * Created by sabir on 19.07.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Modal,
    View,
    ScrollView,
    Image,
    TextInput,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import * as actions from '../../redux/actions/SportActions'

class App extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }


    createRandomForm = () => {
        let {createForm} = this.props;
        let data = {
            email: (+new Date() % 10000) + '@yandex.ru',
            firstName: 'Ivan_' + ((+new Date() % 90) + Math.floor(1000 * Math.random())),
            lastName: 'Petrov_' + ((+new Date() % 90) + Math.floor(1000 * Math.random())),
            age: (+new Date() % 90),
            gender: (Math.random() > 0.5 ? 'male' : 'female')
        }
        createForm(data);
    }

    render = () => {
        let {loading, forms, organizations, loadOrganizations, loadForms} = this.props;

        return (
            <ScrollView style={styles.container} >

                <View>
                    {loading == false ? null :
                        <Text style={{textAlign: 'center'}} >загрузка...</Text>
                    }
                </View>

                <View style={{borderBottomWidth: 1, borderBottomColor: 'pink', marginBottom: 20}} >
                    <View style={{marginBottom: 10}} >
                        <TouchableOpacity onPress={() => {
                            loadOrganizations()
                        }} >
                            <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 24}} >
                                Центры
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 10}} >
                        {organizations.map(org =>
                            <View key={org.id} style={{marginBottom: 20}} >
                                <Text style={{fontSize: 16}} >
                                    {org.name} - {org.address} - {org.phone}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View>
                    <View>
                        <TouchableOpacity onPress={() => {
                            loadForms()
                        }} >
                            <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 24}} >
                                Анкеты
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        {forms.map(form =>
                            <View key={form.id}
                                  style={{padding: 10, marginBottom: 10}}
                            >
                                <Text style={{fontSize: 16}} >
                                    {form.firstName + ' ' + form.lastName} - {form.email}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{paddingBottom: 40}} >
                    <TouchableOpacity
                        style={{padding: 10, marginBottom: 20, padding: 10, borderRadius: 5, backgroundColor: 'pink'}}
                        onPress={() => {
                            this.createRandomForm();
                        }} >
                        <Text style={{fontSize: 18, textAlign: 'center'}}>
                            create random user
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 40
    },

});


const mapStateToProps = (state) => {
    return {
        loading: state.sport.loading,
        forms: state.sport.formsMap.toArray().sort((a, b) => (b.timestamp - a.timestamp)),
        organizations: state.sport.organizationsMap.toArray().sort((a, b) => (b.timestamp - a.timestamp))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadForms: () => {
            return dispatch(actions.loadForms())
        },
        loadOrganizations: () => {
            return dispatch(actions.loadOrganizations())
        },
        createForm: (data) => {
            return dispatch(actions.createForm(data))
        },
        udpateForm: (data) => {
            return dispatch(actions.updateForm(data))
        }
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App