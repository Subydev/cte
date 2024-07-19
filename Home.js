import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Dimensions,
} from "react-native";
import {
  ButtonGroup,
  Icon,
  SocialIcon,
  Divider,
} from "@rneui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // or your preferred icon library

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const inputRefs = useRef({});
  const [state, setState] = useState({
    selectedIndex: 1,
    refTemp: 20,
    matTemp: 26.67,
    cteval: 0.000023,
    lengthVal: 1,
    changeInLengthVal: 0,
    totalLengthVal: 0,
    tempUnits: "°C",
    measUnits: "(mm)",
    cteCo: "mm/mm °C",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("aluminum");
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const [items, setItems] = useState([
    { label: "Custom Material", value: "custom", cteC: 0.000000, cteF: 0.000000 },
    { label: "Aluminum (99.9%)", value: "aluminum", cteC: 0.000023, cteF: 0.000013 },
    { label: "Aluminum (2024-T4)", value: "aluminum_2024", cteC: 0.000022, cteF: 0.000012 },
    { label: "Aluminum (6061-T4)", value: "aluminum_6061", cteC: 0.000024, cteF: 0.0000131 },
    { label: "Aluminum (7075-T6)", value: "aluminum_7075", cteC: 0.000024, cteF: 0.0000131 },
    { label: "Beryllium", value: "beryllium", cteC: 0.000012, cteF: 0.0000064 },
    { label: "Beryllium-Copper", value: "beryllium_copper", cteC: 0.000018, cteF: 0.0000099 },
    { label: "Brass", value: "brass", cteC: 0.000019, cteF: 0.0000104 },
    { label: "Bronze", value: "bronze", cteC: 0.000018, cteF: 0.0000100 },
    { label: "Copper (99.9%)", value: "copper", cteC: 0.000018, cteF: 0.0000098 },
    { label: "Fiberglass", value: "fiberglass", cteC: 0.000014, cteF: 0.0000079 },
    { label: "Gold", value: "gold", cteC: 0.000015, cteF: 0.0000082 },
    { label: "Graphite", value: "graphite", cteC: 0.000008, cteF: 0.0000044 },
    { label: "Invar, Copper Clad", value: "invar_copper_clad", cteC: 0.000006, cteF: 0.0000035 },
    { label: "Iron", value: "iron", cteC: 0.000012, cteF: 0.0000067 },
    { label: "Kovar", value: "kovar", cteC: 0.000006, cteF: 0.0000033 },
    { label: "Lead", value: "lead", cteC: 0.000027, cteF: 0.0000151 },
    { label: "Magnesium", value: "magnesium", cteC: 0.000025, cteF: 0.000014 },
    { label: "Molybdenum", value: "molybdenum", cteC: 0.000005, cteF: 0.000003 },
    { label: "Monel", value: "monel", cteC: 0.000014, cteF: 0.0000075 },
    { label: "Nickel", value: "nickel", cteC: 0.000013, cteF: 0.0000072 },
    { label: "Phosphor Bronze", value: "phosphor_bronze", cteC: 0.000018, cteF: 0.0000099 },
    { label: "Silver", value: "silver", cteC: 0.000019, cteF: 0.0000107 },
    { label: "Solder", value: "solder", cteC: 0.000024, cteF: 0.0000134 },
    { label: "Steel", value: "steel", cteC: 0.000013, cteF: 0.0000073 },
    { label: "Stainless Steel 310", value: "stainless_310", cteC: 0.000014, cteF: 0.0000080 },
    { label: "Stainless Steel 410", value: "stainless_410", cteC: 0.000010, cteF: 0.0000055 },
    { label: "Tin", value: "tin", cteC: 0.000023, cteF: 0.000013 },
    { label: "Titanium", value: "titanium", cteC: 0.000009, cteF: 0.0000048 },
    { label: "Tungsten", value: "tungsten", cteC: 0.000004, cteF: 0.0000024 },
    { label: "Zinc", value: "zinc", cteC: 0.000030, cteF: 0.0000165 },
  ]);

  const updateResults = () => {
    const { lengthVal, cteval, matTemp, refTemp } = state;
    const tempDifference = matTemp - refTemp;
    const changeInLength = (lengthVal * cteval * tempDifference).toFixed(8);
    const totalLength = (parseFloat(changeInLength) + parseFloat(lengthVal)).toFixed(8);

    // Calculate the Correction Scale Factor (CSF)
    const csf = (parseFloat(lengthVal) / parseFloat(totalLength)).toFixed(8);

    setState((prevState) => ({
      ...prevState,
      changeInLengthVal: changeInLength,
      totalLengthVal: totalLength,
      correctionScaleFactor: csf,
    }));
  };

  const updateIndex = (selectedIndex) => {
    if (selectedIndex !== state.selectedIndex) {
      const isMetric = selectedIndex === 1;
      setState((prevState) => {
        const newRefTemp = isMetric ? 20 : 68;
        const newMatTemp = isMetric ? 26.67 : 80;
        const newLengthVal = isMetric
          ? (prevState.lengthVal * 25.4).toFixed(4)
          : (prevState.lengthVal / 25.4).toFixed(4);

        const currentMaterial = items.find(item => item.value === value) || items[0]; // Provide a default material
        const newCteVal = isMetric ? currentMaterial.cteC : currentMaterial.cteF;

        return {
          ...prevState,
          tempUnits: isMetric ? "°C" : "°F",
          measUnits: isMetric ? "(mm)" : "(in)",
          cteCo: isMetric ? "mm/mm °C" : "in/in °F",
          refTemp: newRefTemp,
          matTemp: newMatTemp,
          lengthVal: parseFloat(newLengthVal),
          cteval: newCteVal,
          selectedIndex,
        };
      });
    }
  };

  const onPickerValueChange = (selectedValue) => {
    const selectedMaterial = items.find(item => item.value === selectedValue) || items[0];
    const cteValue = state.selectedIndex === 1 ? selectedMaterial.cteC : selectedMaterial.cteF;
    setState(prevState => ({
      ...prevState,
      cteval: cteValue,
    }));
  };

  useEffect(() => {
    updateResults();
  }, [state.lengthVal, state.cteval, state.matTemp, state.refTemp]);

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    setShowCopiedOverlay(true);
    setTimeout(() => setShowCopiedOverlay(false), 2000);
  };

  const renderResultsCard = () => (
    <View style={styles.card}>
      <View style={styles.resultItem}>
        {renderResultField(
          'changeInLengthVal',
          state.changeInLengthVal,
          state.measUnits,
          "Change in Length",
          "arrow-expand-horizontal"
        )}
      </View>
      <View style={[styles.resultItem, styles.middleResultItem]}>
        {renderResultField(
          'totalLengthVal',
          state.totalLengthVal,
          state.measUnits,
          "Total Length",
          "ruler-square"
        )}
      </View>
      <View style={styles.resultItem}>
        {renderResultField(
          'correctionScaleFactor',
          state.correctionScaleFactor,
          "",
          "Correction Scale Factor",
          "scale-balance"
        )}
      </View>
    </View>
  );
  const renderInputField = (key, value, onChangeText, unit, subText, icon, isEditable = true) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        if (isEditable && inputRefs.current[key]) {
          inputRefs.current[key].focus();
        }
      }}
    >
      <View style={styles.inputWrapper}>
        <View style={styles.leftContent}>
          {icon && <MaterialCommunityIcons name={icon} size={RFValue(20)} color="#4A5568" style={styles.icon} />}
          <View>
            <TextInput
              ref={ref => inputRefs.current[key] = ref}
              style={styles.input}
              value={String(value)}
              onChangeText={onChangeText}
              keyboardType="numeric"
              editable={isEditable}
            />
            {subText && <Text style={styles.subText}>{subText}</Text>}
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.unit}>{unit}</Text>
          {isEditable && <Icon name="chevron-right" type="feather" size={RFValue(16)} color='#A0AEC0' />}
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderResultField = (key, value, unit, subText, icon) => (
    <View style={styles.resultField}>
      <View style={styles.leftContent}>
        {icon && <MaterialCommunityIcons name={icon} size={RFValue(20)} color="#4A5568" style={styles.icon} />}
        <View>
          <Text style={styles.resultValue}>{value}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>

<ScrollView contentContainerStyle={styles.scrollContent}>
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={state.selectedIndex}
              buttons={["Imperial", "Metric"]}
              containerStyle={styles.buttonGroup}
              textStyle={styles.buttonText}
              selectedButtonStyle={styles.selectedButton}
              innerBorderStyle={styles.innerBorder}
            />
  
  <View style={styles.content}>
  <Text style={styles.sectionTitle}>MATERIALS</Text>
  <View style={styles.card}>
  <TouchableOpacity
  style={[styles.pickerButton]}
  onPress={() => setModalVisible(true)}
>
  <MaterialCommunityIcons name="material-ui" size={RFValue(20)} color="#4A5568" />
  <Text style={styles.pickerButtonText}>
    {items.find((item) => item.value === value)?.label || "Select a material"}
  </Text>
  <Icon name="chevron-right" type="feather" size={RFValue(16)} color='#A0AEC0' />
</TouchableOpacity>
  </View>
{renderInputField(
  'cteval',
  state.cteval,
  (cteval) => setState({ ...state, cteval }),
  state.cteCo,
  "Coefficient of Thermal Expansion",
  "alpha"
)}

<Text style={styles.sectionTitle}>TEMPERATURES</Text>
{renderInputField(
  'lengthVal',
  state.lengthVal,
  (lengthVal) => setState({ ...state, lengthVal }),
  state.measUnits,
  "Length",
  "ruler"
)}
{renderInputField(
  'refTemp',
  state.refTemp,
  (refTemp) => setState({ ...state, refTemp }),
  state.tempUnits,
  "Reference Temperature",
  "thermometer"
)}
{renderInputField(
  'matTemp',
  state.matTemp,
  (matTemp) => setState({ ...state, matTemp }),
  state.tempUnits,
  "Material Temperature",
  "thermometer-lines"
)}

<Text style={styles.sectionTitle}>RESULTS</Text>
{renderResultsCard()}
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => Linking.openURL('https://www.engineeringtoolbox.com/thermal-expansion-metals-d_859.html')}
                >
                  <Text style={styles.linkButtonText}>More Information</Text>
                  <Icon name="external-link" type="feather" size={RFValue(16)} color="white" style={styles.linkButtonIcon} />
                </TouchableOpacity>
              </View>
  
              {showCopiedOverlay && (
                <View style={styles.copiedOverlay}>
                  <Text style={styles.copiedText}>Copied to clipboard!</Text>
                </View>
              )}
            </View>
  
            <View style={styles.footer}>
              <Text
                style={styles.footerText}
                onPress={() => Linking.openURL("http://verisurf.com")}
              >
                Verisurf Software, Inc.
              </Text>
              <View style={styles.socialIcons}>
                <SocialIcon
                  type="twitter"
                  onPress={() => Linking.openURL("https://twitter.com/verisurf")}
                />
                <SocialIcon
                  type="linkedin"
                  onPress={() => Linking.openURL("https://www.linkedin.com/company/verisurf/")}
                />
                <SocialIcon
                  type="facebook"
                  onPress={() => Linking.openURL("https://www.facebook.com/verisurf/")}
                />
                <SocialIcon
                  type="instagram"
                  onPress={() => Linking.openURL("https://www.instagram.com/verisurf/")}
                />
                <SocialIcon
                  type="youtube"
                  onPress={() => Linking.openURL("https://www.youtube.com/channel/UCRaDH0ERMqN5Zrz9pUjzwyw")}
                />
              </View>
            </View>
          </ScrollView>
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <ScrollView style={styles.modalScroll}>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.modalItem}
                    onPress={() => {
                      setValue(item.value);
                      onPickerValueChange(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    height: RFValue(36),
    borderRadius: RFValue(18),
    borderColor: '#007AFF',
    backgroundColor: '#F0F0F0',
  },
  buttonText: {
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  resultItem: {
    paddingVertical: RFValue(6),
  },
  middleResultItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: RFValue(8),
  },
  resultField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultValue: {
    fontSize: RFValue(14),
    color: '#4A5568',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: RFValue(6),
    // elevation: 2,
    marginBottom: RFValue(6),
    paddingLeft:RFValue(10),
    // padding: RFValue(4), // Reduce from 12 to 8
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
  },
  container: {
    backgroundColor: "#F7FAFC",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: RFValue(12),
  },
  copiedOverlay: {
    alignItems: "center",
    bottom: RFValue(16),
    left: 0,
    position: "absolute",
    right: 0,
  },
  copiedText: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: RFValue(4),
    color: "white",
    padding: RFValue(8),
  },
  flex1: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#EDF2F7",
    padding: RFValue(12),
  },
  footerText: {
    color: "#4A5568",
    fontSize: RFValue(12),
    fontWeight: "medium",
    marginBottom: RFValue(16),
  },
  innerBorder: {
    width: 0,
  },
  input: {
    fontSize: RFValue(14), 
    lineHeight: RFValue(16), 
    fontWeight: '500',

        color: '#4A5568',
    outlineStyle: 'none',
    padding: 0,
  },
  inputContainer: {
  },
  inputContainerWithBorder: {
    borderBottomWidth: 1,
    borderColor: '#CBD5E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(4), // Add this line to reduce vertical space

  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkButton: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: RFValue(6),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(16),
    padding: RFValue(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: RFValue(8),
  },

  linkButtonIcon: {
    marginLeft: RFValue(6),
  },
  linkButtonText: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    marginRight: RFValue(6),
  },
  modalItem: {
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingVertical: RFValue(12),
    width: "100%",
  },
  modalItemText: {
    color: "#4A5568",
    fontSize: RFValue(12),
  },
  modalScroll: {
    backgroundColor: "white",
    borderRadius: RFValue(16),
    maxHeight: height * 0.8,
    padding: RFValue(16),
    width: width * 0.95,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(8),
    // padding: 0,
    // paddingLeft:RFValue(8)
  },
  pickerButtonText: {
    flex: 1,
    color: "#4A5568",
    fontSize: RFValue(14), 
    lineHeight: RFValue(16), 
    fontWeight: '500',
    marginLeft: RFValue(8),
  },
  pickerContainer: {
    marginBottom: RFValue(10),
    width: '100%',
  },
  resultsContainer: {
    marginTop: RFValue(16),
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: RFValue(16),
  },
  touchableCard: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: RFValue(12),
    fontWeight: '400',
    color: '#718096',
    paddingVertical: RFValue(8),
    marginBottom: RFValue(6),
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  subText: {
    fontSize: RFValue(8),
    color: '#A0AEC0',
    marginTop: RFValue(2),
  },
  touchableInput: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unit: {
    fontSize: RFValue(12),
    color: '#718096',
    marginRight: RFValue(4),
  },
});
export default Home;
