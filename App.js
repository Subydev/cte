import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { Linking } from "expo";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import {
  ButtonGroup,
  ThemeProvider,
  Icon,
  SocialIcon,
  Tooltip,
  Input,
  Slider,
  Divider,
  BottomSheet,
} from "react-native-elements";

var inchUnit = true;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
      refTemp: 68,
      matTemp: 80,
      cteval: 0.000013,
      lengthVal: 1,
      changeInLengthVal: 0,
      totalLengthVal: 0,
      tempUnits: "°F",
      measUnits: "(in)",
      cteCo: "in/in °F",
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  updateResults() {
    if (inchUnit) {
      var changeInLength = parseFloat(this.state.lengthVal * this.state.cteval * (this.state.matTemp - this.state.refTemp)).toFixed(8)
      var totalLength =  parseFloat(changeInLength) + parseFloat(this.state.lengthVal)
      this.setState({
        totalLengthVal: totalLength,
        changeInLengthVal: changeInLength
      });
      console.log("Length = " + this.state.lengthVal)
      console.log("CTE = " + this.state.cteval)
      console.log("Ref Temp = " + this.state.refTemp)
      console.log("Mat Temp = " + this.state.matTemp)
      console.log("TL = " + totalLength)
      console.log("CiL = " + changeInLength)


    }
    if (inchUnit == false) {
      var changeInLength = parseFloat(this.state.lengthVal * (this.state.cteval * 1.8) * (this.state.matTemp - this.state.refTemp)).toFixed(8)
      var totalLength =  parseFloat(changeInLength) + parseFloat(this.state.lengthVal)
      this.setState({
        totalLengthVal: totalLength,
        changeInLengthVal: changeInLength
      });
    }

  }


  updateIndex(selectedIndex) {
    if (selectedIndex == 0) {
      this.setState({
        tempUnits: "°F",
        measUnits: "(in)",
        cteCo: "in/in °F",
        refTemp: 68,
        matTemp: 80,
      });
      inchUnit = true;
      this.updateResults()
    }
    if (selectedIndex == 1) {
      this.setState({
        tempUnits: "°C",
        measUnits: "(mm)",
        cteCo: "mm/mm °C",
        refTemp: 20,
        matTemp: 26,
      });
      inchUnit = false;
      this.updateResults()
    }

    this.setState({ selectedIndex });
  }

  onPickerValueChange = (value, index) => {

      if(inchUnit){
        this.setState(
          {
            cteval: value
          },
        )
      }
      if(inchUnit == false){
        this.setState(
          {
            cteval: parseFloat(value * 1.8).toFixed(8)
          },
        )
      }

      this.updateResults()
    }
  componentDidMount() {

    var refTemp = this.state.refTemp;
    var matTemp = this.state.matTemp;
    var changeinTemp = matTemp - refTemp;
    this.setState({
      totalLengthVal: parseFloat(this.state.lengthVal * this.state.cteval  * changeinTemp + this.state.lengthVal).toFixed(8),
      changeInLengthVal: parseFloat(this.state.lengthVal * this.state.cteval  * changeinTemp).toFixed(8)
    });
    console.log("mounted")

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
              style={{ borderColor: "Purple",  }}
              containerStyle={{ height: 50 }}
            />
          </View>

          {/* Material Container */}
          <View style ={{padding: 10}}>
            <Divider style={{ backgroundColor: "black", height: 1, }} />
          </View>
          <View style={{padding:5}}>
            <View style={{flexDirection:"column"}}>
              <View>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.textColumn}>
                        <Text style={{paddingTop: 10, fontSize: 20}}>Material:</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Picker
                          selectedValue={this.state.cteval}
                          itemStyle={styles.pickerItem}
                          style={styles.pickerStyle}
                          onValueChange={this.onPickerValueChange}


                        >
                          <Picker.Item label={"Custom Material..."} value={"0.000013"} />
                          <Picker.Item label={"Aluminum(99.9%)"} value={"0.000013"} />
                          <Picker.Item label={"Aluminum(2024-T4)"} value={"0.000012"} />
                          <Picker.Item label={"Aluminum(6061-T4)"} value={"0.0000131"} />
                          <Picker.Item label={"Aluminum(7075-T6)"} value={"0.0000131"} />
                          <Picker.Item label={"Beryllium"} value={"0.0000064"} />
                          <Picker.Item label={"Beryllium-Copper"} value={"0.0000099"} />
                          <Picker.Item label={"Brass"} value={"0.0000100"} />
                          <Picker.Item label={"Copper(99.9%)"} value={"0.0000098"} />
                          <Picker.Item label={"Fiberglass"} value={"0.0000079"} />
                          <Picker.Item label={"Gold"} value={"0.0000082"} />
                          <Picker.Item label={"Graphite"} value={"0.0000044"} />
                          <Picker.Item label={"Invar"} value={"0.0.0000035"} />
                          <Picker.Item label={"Iron"} value={"0.0000067"} />
                          <Picker.Item label={"Kovar"} value={"0.0000033"} />
                          <Picker.Item label={"Lead"} value={"0.0000151"} />
                          <Picker.Item label={"Magnesium"} value={"0.000014"} />
                          <Picker.Item label={"Molybdenum"} value={"0.000003"} />
                          <Picker.Item label={"Monel"} value={"0.0000075"} />
                          <Picker.Item label={"Nickel"} value={"0.0000072"} />
                          <Picker.Item label={"PhosphorBronze"} value={"0.0000099"} />
                          <Picker.Item label={"Silver"} value={"0.0000107"} />
                          <Picker.Item label={"Solder"} value={"0.0000134"} />
                          <Picker.Item label={"Steel"} value={"0.0000073"} />
                          <Picker.Item label={"StainlessSteel310"} value={"0.0000080"} />
                          <Picker.Item label={"StainlessSteel410"} value={"0.0000055"} />
                          <Picker.Item label={"Tin"} value={"0.000013"} />
                          <Picker.Item label={"Titanium"} value={"0.0000048"} />
                          <Picker.Item label={"Tungsten"} value={"0.0000024"} />
                          <Picker.Item label={"Zinc"} value={"0.0000165"} />
                        </Picker>
                    </View>
                </View>
              </View>
            </View>
          </View>
          <View style ={{padding: 10}}>
            <Divider style={{ backgroundColor: "black", height: 1 }} />
          </View>

          {/* CTE Container */}
          <View style={{padding:10}}>
            <View style={{flexDirection:"column"}}>
              <View>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.textColumn}>
                        <Text style={styles.textColumnStyle}>CTE:</Text>
                        <Text style={{paddingRight:5, fontSize: 15, }}>{this.state.cteCo} </Text>

                    </View>
                    <View style={styles.inputColumn}>
                        <TextInput 
                        style={{justifyContent: 'flex-end', fontSize:21,}}
                        onChangeText={(cteval) => this.setState({ cteval })}
                        defaultValue={String(this.state.cteval)}
                        onSubmitEditing={this.updateResults}
                        keyboardType={"numeric"} />             
                    </View>
                </View>
              </View>
            </View>
          </View>

          {/* Length Container */}
          <View style={{padding:10}}>
            <View style={{flexDirection:"column"}}>
              <View>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.textColumn}>
                        <Text style={styles.textColumnStyle}>Length:</Text>
                        <Text style={{paddingRight:5, fontSize: 15,}}>{this.state.measUnits} </Text>
                    </View>

                    <View style={styles.inputColumn}>
                        <TextInput 
                        style={{justifyContent: 'flex-end', fontSize:21,}}
                        onChangeText={(lengthVal) => this.setState({ lengthVal })}
                        defaultValue={String(this.state.lengthVal)}
                        onSubmitEditing={this.updateResults}
                        keyboardType={"numeric"} />            
                    </View>
                </View>
              </View>
            </View>
          </View>

          {/* Ref Mat Container */}
          <View style={{padding:10}}>
            <View style={{flexDirection:"column"}}>
              <View>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.textColumn}>
                        <Text style={styles.textColumnStyle}>Ref Temp:</Text>

                    </View>
                    <View style={{borderColor: 'green', borderWidth:0, flexDirection: 'row'}}>
                      <Icon
                        name="thermometer-quarter"
                        type="font-awesome"
                        color="black"
                      />
                      <Text style={{paddingLeft: 5, paddingRight: 5, fontSize: 16}} >{this.state.tempUnits} </Text>
                    </View>
                    <View style={styles.inputColumn}>
                        <TextInput 
                        style={{justifyContent: 'flex-end', fontSize:21,}}
                        onChangeText={(refTemp) => this.setState({ refTemp })}
                        defaultValue={String(this.state.refTemp)}
                        onSubmitEditing={this.updateResults}
                        keyboardType={"numeric"} />            
                    </View>
                </View>
              </View>
            </View>
          </View>

          {/* Mat Container */}
          <View style={{padding:10}}>
            <View style={{flexDirection:"column"}}>
              <View>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.textColumn}>
                        <Text style={styles.textColumnStyle}>Mat Temp:</Text>
                    </View>
                    <View style={{borderColor: 'green', borderWidth:0, flexDirection: 'row'}}>
                      <Icon
                        name="thermometer-quarter"
                        type="font-awesome"
                        color="black"
                      />
                      <Text style={{paddingLeft: 5, paddingRight: 5, fontSize: 16}} >{this.state.tempUnits} </Text>
                    </View>
                    <View style={styles.inputColumn}>
                        <TextInput 
                        style={{justifyContent: 'flex-end', fontSize:21,}}
                        onChangeText={(matTemp) => this.setState({ matTemp })}
                        defaultValue={String(this.state.matTemp)}
                        onSubmitEditing={this.updateResults}
                        keyboardType={"numeric"} />            
                    </View>
                </View>
              </View>
            </View>
          </View>

          {/* {Results Divider Container} */}
          <View>
            <Divider style={{ backgroundColor: "light-gray", height: 35 }} />
          </View>

          {/* Change in Length */}
          <View style={{paddingLeft: 10}}>
            <Text style={styles.textColumnStyle}>Change in Length: </Text>
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
              numericvalue
              editable={false}
              leftIcon={{ type: "font-awesome", name: "angle-right" }}
              style={styles}
              value={String(this.state.changeInLengthVal)}
              //onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>

          {/* Total Length */}
          <View style={{paddingLeft: 10}}>
            <Text style={styles.textColumnStyle}>Total Length: </Text>
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
              numericvalue
              editable={false}
              leftIcon={{ type: "font-awesome", name: "angle-double-right" }}
              style={styles}
              value={String(this.state.totalLengthVal)}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>

          {/* {Logo Divider } */}
 
          <View style={{flex: 1, paddingTop: 21, alignItems: 'center', }}>
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

export default App;

const styles = StyleSheet.create({

  // parentContainer:
  // {
  //   flex:1, 
  //   borderColor:'purple', 
  //   borderWidth: 0, 
  //   padding: 10,
  // },

  textColumn:{
    flex:1, 
    borderColor:'purple', 
    borderWidth: 0, 
    paddingLeft: 0, 
    marginRight: -50
  },

  textColumnStyle:{
    justifyContent: 'flex-start',
    fontSize:21,
  },

  pickerItem: {
    color: 'black',
    height: 60,
    fontSize:20,
    alignContent: "center",
    flexDirection: "column"
  },
  pickerStyle: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 1
  },
  inputColumn:{
    flex:1, 
    borderColor:'black', 
    borderWidth: 1, 
    paddingLeft: 5, 
    marginRight: 10, 
    height: 35,
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
    justifyContent: "flex-start",
  },
  radios: {
    flex: 1,
    borderWidth: 0,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  endSeperator: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 15,
    paddingBottom: 0,
  },
});
