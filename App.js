import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { Linking } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ButtonGroup, ThemeProvider, Icon, SocialIcon, Tooltip, Input, Slider, Divider, BottomSheet } from 'react-native-elements';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      selectedIndex: 0,
      refTemp: 68,
      matTemp: 80,
      cteval: 20,
      lengthVal: 1,
      changeInLengthVal: 0,
      totalLengthVal: 0,
      tempUnits: '°F',
      measUnits: '  In.',
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateResults() {
    console.log("SendingUpdates")
    var refTemp = 2
    var matTemp = 1
    var changeinTemp = refTemp - matTemp

    this.setState({ 

      totalLengthVal: changeinTemp, 

  })
}

  updateIndex(selectedIndex) {

    if(selectedIndex ==1){
      this.setState({ 
        tempUnits:'°C', 
        measUnits: '  mm.', 
        refTemp: 20,
        matTemp:26,
      })
    }
    if(selectedIndex ==0){
      this.setState({ 
        tempUnits:'°F', 
        measUnits: '  in', 
        refTemp: 68,
        matTemp:80,

      })
    }
    this.setState({ selectedIndex  
    });
  }

  render() {

    const buttons = ["Imperial", "Metric"];
    const { selectedIndex } = this.state;
    

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.radios}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            style={{ borderColor: "Purple" }}
            containerStyle={{ height: 60 }}
          />
        </View>

        {/* {Material Container} */}
        <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>Material: </Text>
          <TextInput style={styles.textinputStyle}
            // onChangeText={}
            value={"Custom..."}
          />
        </View>
        {/* {CTE Container} */}
        <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>CTE: </Text>
          <TextInput style={styles.textinputStyle}
          keyboardType = {"numeric"}
          // onSubmitEditing= {this.updateResults}
          value={String(this.state.cteval)}
          />
          
        </View>
        <View style={{padding: 10}}>

    </View>
        {/* {Length Container} */}
        <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>Length: </Text>
          <TextInput style={styles.textinputStyle}            
          // onChangeText={}
          keyboardType={"numeric"}

            value={String(this.state.lengthVal)}
          />
          <Text style={styles.textStyle}>{this.state.measUnits} </Text>
        </View>

        {/* {Reference Temperature Container} */}
        <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>Ref Temperature: </Text>
          <TextInput style={styles.textinputStyle}
            // onChangeText={}
            value={String(this.state.refTemp)}
            keyboardType={"numeric"}

          />
          <Icon
            name="thermometer-quarter"
            type="font-awesome"
            color="black"
            onPress={() => console.log("hello")}
          />
          <Text style={styles.textStyle}>{this.state.tempUnits} </Text>

        </View>
        {/* {Material Temperature Container} */}
        <View style={styles.rowContainer}>
        <Text style={styles.textStyle}>Mat Temperature: </Text>
          <TextInput style={styles.textinputStyle}
                      keyboardType={"numeric"}

          // onChangeText={}
            value={String(this.state.matTemp)}
          />
          <Icon
            name="thermometer-half"
            type="font-awesome"
            color="black"
            paddingRight='22'
            onPress={() => console.log("hello")}
          />
          <Text style={styles.textStyle}>{this.state.tempUnits} </Text>

        </View>
        {/* {Results Divider Container} */}
        <View>
          <Divider style={{ backgroundColor: "light-gray", height: 50 }} />
        </View>
        {/* Change in Length */}
        <View>
        <Text style={styles.textStyle}>Change in Length: </Text>
        </View>
        <View
          style={{
            borderColor: "black",
            borderWidth: 0,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Input
            placeholder=".000031"
            numericvalue
            editable = {false}
            leftIcon={{ type: "font-awesome", name: "angle-right" }}
            style={styles}
            value={String(this.state.changeInLengthVal)}
            onChangeText={(value) => this.setState({ comment: value })}
          />
        </View>

        {/* Total Length */}
        <Text style={styles.textStyle}>Total Length: </Text>
        <View
          style={{
            borderColor: "black",
            borderWidth: 0,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Input
            placeholder="1.00031"
            numericvalue
            editable = {false}
            leftIcon={{ type: "font-awesome", name: "angle-double-right" }}
            style={styles}
            value={String(this.state.totalLengthVal)}
            onChangeText={(value) => this.setState({ comment: value })}
          />
        </View>

        {/* {Logo Divider } */}
        <View style={styles.rowContainer}>
          <Text>VERISURF SOFTWARE, INC.</Text>
        </View>

        <StatusBar style="auto" />

        {/* {Start Footer} */}
        <View style={styles.endSeperator}>
          <SocialIcon
            type="twitter"
            raised
            light={false}
            onPress={() => Linking.openURL("https://twitter.com/verisurf")}
          />
          <SocialIcon
            type="linkedin"
            raised
            light={false}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/company/verisurf/")
            }
          />
          <SocialIcon
            type="facebook"
            raised
            light={false}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/verisurf/")
            }
          />
          <SocialIcon
            type="instagram"
            raised
            light={false}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/verisurf/")
            }
          />
          <SocialIcon
            type="youtube"
            raised
            light={false}
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/channel/UCRaDH0ERMqN5Zrz9pUjzwyw"
              )
            }
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0
  },
  
  textinputStyle: {
      height: 40,
      paddingLeft: 10,
      marginLeft: 10,
      marginRight: 15,
      flex: 1,
      borderColor: "black",
      borderWidth: 1,
      width: 100,
      fontSize: 20,

  },
  textStyle: {
      marginLeft: 10,
      fontSize: 20,
      marginRight: 10,

},
  container: {
    flex: 1,
    borderWidth: 0,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  radios: {
    flex: 1,
    borderWidth: 0,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endSeperator: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 0,
    paddingBottom: 0,
  },
});
