import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Linking } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ButtonGroup, ThemeProvider, Icon, SocialIcon, Tooltip, Input, Slider } from 'react-native-elements';




class App extends React.Component {

  constructor() {

    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render() {

    const buttons = ['Imperial', 'Metric']
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>

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
          <Text>TODO: Material: ListBox</Text>
          <TextInput
            style={{ height: 40, borderColor: 'black', borderWidth: 1 }}
            // onChangeText={}
            value={'Custom...'}
          />
        </View>
        {/* {CTE Container} */}
        <View style={styles.rowContainer}>
          <Text>TODO: CTE: TextInput Subote: 1e6</Text>
        </View>

        {/* {Length Container} */}
        <View style={styles.rowContainer}>
          <Text>TODO: Length: TextInput</Text>
        </View>

        {/* {Reference Temperature Container} */}
        <View style={styles.rowContainer}>
          <Text>TODO: Reference Temperature: TextInput</Text>
        </View>

        {/* {Material Temperature Container} */}
        <View style={styles.rowContainer}>
          <Text>TODO: Material Temperature: TextInput</Text>
        </View>

        {/* {Results Divider Container} */}
        <View style={styles.rowContainer}>
          <Text>TODO: Divider</Text>
        </View>

        {/* {Results Divider } */}
        <View style={styles.rowContainer}>
          <Text>TODO: Change in Length: Label</Text>
          <Text>TODO: Total Length: Label</Text>
        </View>

        {/* {Logo Divider } */}
        <View style={styles.rowContainer}>
          <Text>VERISURF SOFTWARE, INC.</Text>
        </View>

        <StatusBar style="auto" />

        {/* {Start Footer} */}
        <View style={styles.endSeperator}>
          <SocialIcon
            type='twitter'
            raised
            light={true}
            onPress={() => Linking.openURL('https://twitter.com/verisurf')}
          />
          <SocialIcon
            type='linkedin'
            raised
            light={true}
            onPress={() => Linking.openURL('https://www.linkedin.com/company/verisurf/')}
          />
          <SocialIcon
            type='facebook'
            raised
            light={true}
            onPress={() => Linking.openURL('https://www.facebook.com/verisurf/')}
          />
          <SocialIcon
            type='instagram'
            raised
            light={true}
            onPress={() => Linking.openURL('https://www.instagram.com/verisurf/')}
          />
          <SocialIcon
            type='youtube'
            raised
            light={true}
            onPress={() => Linking.openURL('https://www.youtube.com/channel/UCRaDH0ERMqN5Zrz9pUjzwyw')}
          />
        </View>

      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    borderColor: "green",
    borderWidth: 4,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 4,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radios: {
    flex: 1,
    borderColor: "purple",
    borderWidth: 4,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endSeperator: {
    flex: 1,
    borderColor: "red",
    borderWidth: 4,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 0,
    paddingBottom: 0,
  },
});
