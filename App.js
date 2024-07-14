import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Clipboard from "expo-clipboard";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Dimensions,
  Platform,
} from "react-native";
import {
  ButtonGroup,
  Icon,
  SocialIcon,
  Divider,
  Input,
} from "@rneui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const App = () => {
  const [state, setState] = useState({
    selectedIndex: 1, // Default to Metric
    refTemp: 20,
    matTemp: 26.67,
    cteval: 0.000013,
    lengthVal: 1,
    changeInLengthVal: 0,
    totalLengthVal: 0,
    tempUnits: "°C",
    measUnits: "(mm)",
    cteCo: "mm/mm °C",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("custom_0.000013_0.000007222");
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
        
        // Find the current material based on the current value state
        const currentMaterial = items.find(item => item.value === value);
        
        // If no material is found, use a default CTE value
        const newCteVal = currentMaterial 
          ? (isMetric ? currentMaterial.cteC : currentMaterial.cteF)
          : prevState.cteval;
  
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
    setValue(selectedValue); // Update the value state
    const selectedMaterial = items.find(item => item.value === selectedValue);
    if (selectedMaterial) {
      const cteValue = state.selectedIndex === 1 ? selectedMaterial.cteC : selectedMaterial.cteF;
      setState(prevState => ({
        ...prevState,
        cteval: cteValue,
      }));
    }
  };

  useEffect(() => {
    updateResults();
  }, [state.lengthVal, state.cteval, state.matTemp, state.refTemp]);

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    setShowCopiedOverlay(true);
    setTimeout(() => setShowCopiedOverlay(false), 2000);
  };

  const renderInputField = (label, value, onChangeText, unit) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={String(value)}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
  
  const handleSelectionChange = (selectedValue, isUnitChange) => {
    // Update value state
    setValue(selectedValue);
  
    if (isUnitChange) {
      updateIndex(selectedValue === "Imperial" ? 0 : 1); // Convert "Imperial" to 0 and "Metric" to 1
    } else {
      // Material change logic (find cteValue and update state)
      const selectedMaterial = items.find(item => item.value === selectedValue);
      if (selectedMaterial) {
        const cteValue = state.selectedIndex === 1 ? selectedMaterial.cteC : selectedMaterial.cteF;
        setState(prevState => ({ ...prevState, cteval: cteValue }));
      }
    }
  };
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
            <ButtonGroup
                onPress={updateIndex}
                selectedIndex={state.selectedIndex}
                buttons={["Imperial", "Metric"]}
                containerStyle={styles.buttonGroup}
                textStyle={styles.buttonText}
                selectedButtonStyle={styles.selectedButton}
                innerBorderStyle={styles.innerBorder}
              />

              <Divider style={styles.divider} />

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Material:</Text>
                <TouchableOpacity
                  style={styles.pickerButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.pickerButtonText}>
                    {items.find((item) => item.value === value)?.label ||
                      "Select a material"}
                  </Text>
                </TouchableOpacity>
              </View>

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

              <Divider style={styles.divider} />

              {renderInputField(
                "CTE",
                state.cteval,
                (cteval) => setState({ ...state, cteval }),
                state.cteCo
              )}
              {renderInputField(
                "Length",
                state.lengthVal,
                (lengthVal) => setState({ ...state, lengthVal }),
                state.measUnits
              )}
              {renderInputField(
                "Ref Temp",
                state.refTemp,
                (refTemp) => setState({ ...state, refTemp }),
                state.tempUnits
              )}
              {renderInputField(
                "Mat Temp",
                state.matTemp,
                (matTemp) => setState({ ...state, matTemp }),
                state.tempUnits
              )}

              <View style={styles.resultsContainer}>
                <Text style={styles.resultLabel}>Change in Length:</Text>
                <View style={styles.resultInputWrapper}>
                  <Text style={styles.resultText}>{state.changeInLengthVal}</Text>
                </View>
                <Text style={styles.resultLabel}>Total Length:</Text>
                <TouchableOpacity onPress={() => copyToClipboard(String(state.totalLengthVal))}>
                  <View style={styles.resultInputWrapper}>
                    <Text style={styles.resultText}>{state.totalLengthVal}</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.resultLabel}>Correction Scale Factor:</Text>
                <View style={styles.resultInputWrapper}>
                  <Text style={styles.resultText}>{state.correctionScaleFactor}</Text>
                </View>
                {showCopiedOverlay && (
                  <View style={styles.copiedOverlay}>
                    <Text style={styles.copiedText}>Copied to clipboard!</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.footer}>
              <Text
                style={styles.footerText}
                onPress={() => Linking.openURL("http://verisurf.com")}
              >
                VERISURF SOFTWARE, INC.
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
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: RFValue(20),
  },
  content: {
    flex: 1,
    padding: RFValue(20),
  },
  buttonGroup: {
    height: RFValue(50),
    marginBottom: RFValue(20),
    borderRadius: RFValue(10),
    borderColor: "#4A5568",
  },
  buttonText: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#4A5568",
  },
  selectedButton: {
    backgroundColor: "#4A5568",
  },
  innerBorder: {
    width: 0,
  },
  divider: {
    backgroundColor: "#CBD5E0",
    height: 1,
    marginVertical: RFValue(20),
  },
  pickerContainer: {
    marginBottom: RFValue(20),
  },
  pickerButton: {
    backgroundColor: "#EDF2F7",
    padding: RFValue(12),
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  pickerButtonText: {
    fontSize: RFValue(16),
    color: "#4A5568",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalScroll: {
    width: width * 0.95,
    maxHeight: height * 0.8,
    backgroundColor: "white",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  modalItem: {
    paddingVertical: RFValue(15),
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    width: "100%",
  },
  modalItemText: {
    fontSize: RFValue(16),
    color: "#4A5568",
  },
  inputContainer: {
    marginBottom: RFValue(16),
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: RFValue(5),
    color: "#4A5568",
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: RFValue(8),
    paddingHorizontal: RFValue(12),
    borderWidth: 1,
    borderColor: '#CBD5E0',
    height: RFValue(50),
  },
  input: {
    flex: 1,
    fontSize: RFValue(16),
    color: '#4A5568',
  },
  unit: {
    marginLeft: RFValue(10),
    fontSize: RFValue(16),
    color: '#718096',
  },
  resultInputWrapper: {
    backgroundColor: '#EDF2F7',
    borderRadius: RFValue(8),
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(20),
    height: RFValue(50),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  resultText: {
    fontSize: RFValue(16),
    color: '#4A5568',
    fontWeight: '600',
  },
  footer: {
    alignItems: "center",
    padding: RFValue(16),
    backgroundColor: "#EDF2F7",
  },
  footerText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    marginBottom: RFValue(20),
    color: "#4A5568",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  copiedOverlay: {
    position: "absolute",
    bottom: RFValue(20),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  copiedText: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: RFValue(10),
    borderRadius: RFValue(5),
  },
});

export default App;