import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image,
  Animated,
  Easing
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Location, Permissions, MapView, ImagePicker  } from 'expo';

//Screens
class SplashScreen extends React.Component {


  press() {
    this.props.navigation.navigate('Login');
  }
  register() {
    this.props.navigation.navigate('Register');
  }

  login(username, password) {
    fetch('https://hohoho-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        AsyncStorage.setItem('user', JSON.stringify({
          username: username,
          password: password
        }));
        this.props.navigation.navigate('Home')
      }
      else {
        this.setState({message:responseJson.error})
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
  }

  anonLogin(username, password) {
    this.props.navigation.navigate('Home')
  }

  componentDidMount() { //persistent login
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        return this.login(username, password)
          .then(resp => resp.json())
          .then((responseJson) => {
            if (responseJson.success) {
              this.props.navigation.navigate('Splash')
            }
          });
      }
    })
    .catch(err => { console.log('error', err) })
  }

  // need to make a homepage function and an onpress for SKIP

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/icons/LogoName.png')}
          style={styles.image}
        ></Image>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}> - or - </Text>
        <TouchableOpacity style={[styles.buttonSmall]} onPress={ () => {this.props.navigation.navigate('Home')}}>
          <Text style={styles.buttonLabel2}>Skip</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up'
  };
  constructor() {
    super();
      this.state={
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
      };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/icons/FitiBlackBackground.png')}
          style={styles.imageSmall}
        ></Image>
        <TextInput
          style={styles.inputField}
          placeholder='First Name'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({firstname: text})}
          value={this.state.firstname}
          >
        </TextInput>
        <TextInput
          style={styles.inputField}
          placeholder='Last Name'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({lastname: text})}
          value={this.state.lastname}
          >
        </TextInput>
        <TextInput
          style={styles.inputField}
          placeholder='Email'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.email}
          >
        </TextInput>
        <TextInput
          style={styles.inputField}
          placeholder='Username'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          >
        </TextInput>
        <TextInput
          style={styles.inputField}
          placeholder='Password'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          >
        </TextInput>
        <TouchableOpacity
          style={[styles.button2, styles.buttonBlue]}
          onPress={() => {
              fetch('https://hohoho-backend.herokuapp.com/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password,
                })
              })
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.success) {
                this.props.navigation.navigate('Splash')
                }
                else {
                  console.log(responseJson)
                }
              })
                .catch((err) => {
                  console.log('error', err)
              })
          }}
          >
          <Text style={styles.buttonLabel}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };
  constructor() {
    super();
      this.state={
        username: '',
        password: ''
      };
  }
  login(username, password) {
    fetch('https://hohoho-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        AsyncStorage.setItem('user', JSON.stringify({
          username: username,
          password: password
        }));
        this.props.navigation.navigate('Home')
      }
      else {
        this.setState({message:responseJson.error})
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/icons/FitiBlackBackground.png')}
          style={styles.imageSmall}
        ></Image>
        <TextInput
          style={styles.inputField}
          placeholder='Username'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          >
        </TextInput>
        <TextInput
          style={styles.inputField}
          placeholder='Password'
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          message=''
          >
        </TextInput>
        <TouchableOpacity
          style={[styles.button2, styles.buttonGreen]}
          onPress={() =>  this.login(this.state.username, this.state.password) }
          >
          <Text style={styles.buttonLabel} >Login</Text>
        </TouchableOpacity>
        <Text style={styles.textSmall} >{this.state.message}</Text>
      </View>
    )
  }
}

//let picUri;

class HomePage extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Report Grafitti',
  });
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.15)
  this.state = {
    coordinate: [],
    message: '',
    image: ''
    }
  }

  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });


    if (!result.cancelled) {
      this.props.navigation.navigate('AfterPhoto', {image: result.uri})
    }
  };

  sendBrocation = async(user) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        alert("You must share your location with Bro to use this feature. Please go to settings to allow location services.")
      } else {
        let brocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        fetch('https://hohoho-backend.herokuapp.com/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: user._id,
          location: {
            longitude: brocation.coords.longitude,
            latitude: brocation.coords.latitude
          }
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          Alert.alert(
            "Bro!",
            "You sent your brocation to " + user.username + "!",
            [{text: "Got it bro!"}],
            )
        }
        else {
          this.setState({message:responseJson.error})
        }
      })
        .catch((err) => {
          console.log('error', err)
      })
      }
  }

  // componentDidMount() {
  //   this._takeImage();
  // }

  componentDidMount () {
    this.spring()
  }
  spring () {
    this.springValue.setValue(0.15)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
      ).start()
  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._takeImage()}>
          <Image source={require('./assets/icons/BIcircle.png')} style={styles.circle}>
          <Animated.Image
            style={{
              height: 154,
              width: 200,
              transform: [{scale: this.springValue}] }}
              source={require('./assets/icons/camera.png')}
          />
          </Image>
        </TouchableOpacity>
        <View style={styles.container2}>
          <TouchableOpacity onPress={() => (this.props.navigation.navigate('Menu'))}>
            <View style={styles.circle2}>
              <Image
                source={require('./assets/icons/MenuIcon.png')}
                style={styles.imageCornerLeft}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (this.props.navigation.navigate('Map'))}>
            <View style={styles.circle2}>
              <Image
                source={require('./assets/icons/MapMarker.png')}
                style={styles.imageCornerRight}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class AfterPhoto extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Submit Photo',
  });
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: ''
    };
  }

  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  // {<Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}> {this.props.image} </Text>
        <Image source={{ uri: this.props.navigation.state.params.image }} style={{ width: 200, height: 200 }} />
      </View>
    )
  }
}

class Map extends React.Component {
  constructor() {
    super();
  this.state = {
    locations: [],
    error: '',
    allCoordinates: []
    };
  }

  _filter(jsonObj) {
    const coordinates = []
    jsonObj.map((serviceRequest) => {
      if(serviceRequest.status==="Open"){
        coordinates.push({"latitude": serviceRequest.latitude, "longitude": serviceRequest.longitude,
        "title": "Service Request Number", "subtitle": serviceRequest.service_request_number})
      }

    })

    return coordinates

  }

  componentDidMount() {
    console.log("it's getting here")
    fetch('https://data.cityofchicago.org/resource/cdmx-wzbz.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        const filteredJsonObj = this._filter(responseJson)
        this.setState({allCoordinates: filteredJsonObj})
      }
      else {
        this.setState({message:responseJson.error})
      }
    })
      .catch((err) => {
        console.log('error', err)
    })
  }
  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    return (
      <View style={styles.mapBackground}>
        <MapView
          style={{flex: .93}}
          initialRegion={{
            latitude: 41.8702179,
            longitude: -87.7589756,
            latitudeDelta: .5,
            longitudeDelta: .25,
          }}
        >
        {this.state.allCoordinates.map((locationObj) => {
          return <MapView.Marker coordinate={{"latitude": locationObj.latitude, "longitude": locationObj.longitude}}
            title={locationObj.title}
            description={locationObj.subtitle} /> })}
        </MapView>
        <View style={styles.mapTextBackground}>
          <Image
            source={require('./assets/icons/FitiText.png')}
            style={styles.imageSmallMap}
          ></Image>
        </View>
      </View>

    )
  }
}

class MenuScreen extends React.Component {
  constructor() {
    super();
  this.state = {
    locations: [],
    error: '',
    allCoordinates: []
    }
}
    render () {
        return (
            <View style={styles.menuContainer}>
                <View style={{width: 400, paddingTop: 20, justifyContent: 'space-between'}}>
                    <Image
                      source={require('./assets/icons/logocolor.png')}
                      style={styles.image}
                    ></Image>
                    <TouchableOpacity onPress={ () => {this.props.navigation.navigate('About')}} style={[styles.button, styles.buttonGreen]}>
                      <Text style={styles.buttonLabel}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.props.navigation.navigate('Contact')} }>
                      <Text style={styles.buttonLabel}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.props.navigation.navigate('Splash')}}>
                      <Text style={styles.buttonLabel}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.copyright}> - Copyright © 2017 - Bhatti, Chen, Hennessey, Torrance - </Text>
            </View>
        )
    }

}

class AboutScreen extends React.Component {
  constructor() {
    super();
  this.state = {
    locations: [],
    error: '',
    allCoordinates: []
    }
}
    render () {
        return (
            <View style={styles.aboutContainer}>
                <View style={{width: 400, paddingTop: 20, justifyContent: 'space-between'}}>
                    <Image
                      source={require('./assets/icons/logocolor.png')}
                      style={styles.image}
                    ></Image>
                </View>
                <Text style={styles.abouttext}> The founders of this application
                created this entire experience in under 24 hours at the Horizons Hackathon
                in San Francisco, California.  Absolutely Obscene.  Please use our app,
                and be sure to give us all 6 figure jobs.  Have a wonderful day!
                </Text>
            </View>
        )
    }
}

class ContactScreen extends React.Component {
  constructor() {
    super();
  this.state = {
    locations: [],
    error: '',
    allCoordinates: []
    }
}
    render () {
        return (
            <View style={styles.menuContainer}>
                <View style={{width: 400, paddingTop: 20, justifyContent: 'space-between'}}>
                    <Image
                      source={require('./assets/icons/logocolor.png')}
                      style={styles.image}
                    ></Image>
                </View>
                <Text style={styles.copyright}> The founders of this application
                created this entire experience in under 24 hours at the Horizons Hackathon
                in San Francisco, California.  Absolutely Obscene.  Please use our app,
                and be sure to give us all 6 figure jobs.  Thank you, and have a wonderful day!
                </Text>
            </View>
        )
    }

}

//Navigator
export default StackNavigator({
  Splash: {screen: SplashScreen},
  Register: {screen: RegisterScreen},
  Login: {screen: LoginScreen},
  Home: {screen: HomePage},
  Map: {screen: Map},
  Menu: {screen: MenuScreen},
  AfterPhoto: {screen: AfterPhoto},
  About: {screen: AboutScreen},
  Contact: {screen: ContactScreen}
}, {initialRouteName: 'Splash'});


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  abouttext: {
      fontSize: 20,
      color: 'white',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 35,
      marginRight: 35
  },
  container2: {
    flexDirection: 'row',
    width: 370,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'black',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'column'
  },
  aboutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'column'
  },
  circle: {
    width: 300,
    height: 300,
    // borderRadius: 300/2,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 110,
  },
  copyright: {
      fontSize: 12,
      color: 'gray',
      alignItems: 'flex-end',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 10,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapTextBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#e8e4df',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    width: 300,
    color: '#463628',
  },
  textSmall: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
    width: 200
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
  },
  button2: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
  },
  buttonSmall: {
    backgroundColor: '#545454',
    borderRadius: 5,
    borderColor: '#545454',
    borderWidth: 1,
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonRed: {
    backgroundColor: '#e8e4df',
  },
  buttonBlue: {
    backgroundColor: '#e8e4df',
  },
  buttonGreen: {
    backgroundColor: '#e8e4df'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  },
  buttonLabel2: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },
  inputField: {
    color: 'white',
    height: 40,
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
  },
  image: {
    display: 'block',
    height: 300,
    width: 400,
    resizeMode: 'stretch',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSmall: {
    display: 'block',
    height: 150,
    width: 200,
    resizeMode: 'stretch',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
<<<<<<< HEAD
  imageMain: {
    height: 100,
    width: 129.87013,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
=======
>>>>>>> c4ea55246d59886548d053a28f7e3c7797064383
  imageCornerLeft: {
    height: 29,
    width: 29,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCornerRight: {
    height: 37,
    width: 37,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSmallMap: {
    display: 'block',
    height: 45,
    width: 200,
    resizeMode: 'stretch',
    marginBottom: 20,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultFont: {
    fontSize: 18,
    textAlign: 'center',
    color: '#463628',
  },
  defaultFont2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
    color: '#463628',
  },
  orText: {
    color: 'white',
    marginBottom: 15,
    marginTop: 15,
  }
});
