import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  useColorScheme,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { ButtonGroup, Icon, SocialIcon, Divider } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // or your preferred icon library
import * as Clipboard from "expo-clipboard";
import { useRouter } from 'expo-router';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import VerisurfIcon from './VerisurfIcon'; // Import your new icon


const { width, height } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const inputRefs = useRef({});
  const [state, setState] = useState({
    selectedIndex: 1,
    refTemp: 20,
    matTemp: 26.67,
    cteval: 0.000023,
    lengthVal: 25.4,
    changeInLengthVal: 0,
    totalLengthVal: 0,
    tempUnits: "°C",
    measUnits: "(mm)",
    cteCo: "mm/mm °C",
  });

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
    const themeSubTextStyle =
    colorScheme === "light" ? styles.lightThemeSubText : styles.darkThemeSubText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
    const themeCardStyle =
    colorScheme === "light" ? styles.lightCard : styles.darkCard;
    const themeSeperatorStyle =
    colorScheme === "light" ? styles.lightSeparator : styles.darkSeperator;
    const modalItemStyle =
    colorScheme === "light" ? styles.modalItemLight : styles.modalItemDark;

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("aluminum");
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [items, setItems] = useState([
    { label: "Custom Material", value: "custom", cteC: 0.0, cteF: 0.0 },
    {
      label: "Aluminum (99.9%)",
      value: "aluminum",
      cteC: 0.000023,
      cteF: 0.000013,
    },
    {
      label: "Aluminum (2024-T4)",
      value: "aluminum_2024",
      cteC: 0.000022,
      cteF: 0.000012,
    },
    {
      label: "Aluminum (6061-T4)",
      value: "aluminum_6061",
      cteC: 0.000024,
      cteF: 0.0000131,
    },
    {
      label: "Aluminum (7075-T6)",
      value: "aluminum_7075",
      cteC: 0.000024,
      cteF: 0.0000131,
    },
    { label: "Beryllium", value: "beryllium", cteC: 0.000012, cteF: 0.0000064 },
    {
      label: "Beryllium-Copper",
      value: "beryllium_copper",
      cteC: 0.000018,
      cteF: 0.0000099,
    },
    { label: "Brass", value: "brass", cteC: 0.000019, cteF: 0.0000104 },
    { label: "Bronze", value: "bronze", cteC: 0.000018, cteF: 0.00001 },
    {
      label: "Copper (99.9%)",
      value: "copper",
      cteC: 0.000018,
      cteF: 0.0000098,
    },
    {
      label: "Fiberglass",
      value: "fiberglass",
      cteC: 0.000014,
      cteF: 0.0000079,
    },
    { label: "Gold", value: "gold", cteC: 0.000015, cteF: 0.0000082 },
    { label: "Graphite", value: "graphite", cteC: 0.000008, cteF: 0.0000044 },
    {
      label: "Invar, Copper Clad",
      value: "invar_copper_clad",
      cteC: 0.000006,
      cteF: 0.0000035,
    },
    { label: "Iron", value: "iron", cteC: 0.000012, cteF: 0.0000067 },
    { label: "Kovar", value: "kovar", cteC: 0.000006, cteF: 0.0000033 },
    { label: "Lead", value: "lead", cteC: 0.000027, cteF: 0.0000151 },
    { label: "Magnesium", value: "magnesium", cteC: 0.000025, cteF: 0.000014 },
    {
      label: "Molybdenum",
      value: "molybdenum",
      cteC: 0.000005,
      cteF: 0.000003,
    },
    { label: "Monel", value: "monel", cteC: 0.000014, cteF: 0.0000075 },
    { label: "Nickel", value: "nickel", cteC: 0.000013, cteF: 0.0000072 },
    {
      label: "Phosphor Bronze",
      value: "phosphor_bronze",
      cteC: 0.000018,
      cteF: 0.0000099,
    },
    { label: "Silver", value: "silver", cteC: 0.000019, cteF: 0.0000107 },
    { label: "Solder", value: "solder", cteC: 0.000024, cteF: 0.0000134 },
    { label: "Steel", value: "steel", cteC: 0.000013, cteF: 0.0000073 },
    {
      label: "Stainless Steel 310",
      value: "stainless_310",
      cteC: 0.000014,
      cteF: 0.000008,
    },
    {
      label: "Stainless Steel 410",
      value: "stainless_410",
      cteC: 0.00001,
      cteF: 0.0000055,
    },
    { label: "Tin", value: "tin", cteC: 0.000023, cteF: 0.000013 },
    { label: "Titanium", value: "titanium", cteC: 0.000009, cteF: 0.0000048 },
    { label: "Tungsten", value: "tungsten", cteC: 0.000004, cteF: 0.0000024 },
    { label: "Zinc", value: "zinc", cteC: 0.00003, cteF: 0.0000165 },
  ]);
  const ResourceLink = ({ text, LeftIcon, onPress, colorScheme }) => (
    <TouchableOpacity style={styles.resourceButton} onPress={onPress}>
      <View style={styles.resourceLeftContent}>
        <LeftIcon width={RFValue(18)} height={RFValue(18)} fill={colorScheme === "light" ? "rgb(15 23 42)" : "rgb(148 163 184)"} />
        <Text style={[styles.resourceButtonText, themeTextStyle]}>
  
          {text}
        </Text>
      </View>
      <Icon
        name="external-link"
        type="feather"
        size={RFValue(14)}
        color="#A0AEC0"
      />
    </TouchableOpacity>
  );
  const updateResults = () => {
    const { lengthVal, cteval, matTemp, refTemp } = state;
    const tempDifference = matTemp - refTemp;
    const changeInLength = (lengthVal * cteval * tempDifference).toFixed(8);
    const totalLength = (
      parseFloat(changeInLength) + parseFloat(lengthVal)
    ).toFixed(8);

    // Calculate the Correction Scale Factor (CSF)
    const csf = (parseFloat(lengthVal) / parseFloat(totalLength)).toFixed(8);

    setState((prevState) => ({
      ...prevState,
      changeInLengthVal: changeInLength,
      totalLengthVal: totalLength,
      correctionScaleFactor: csf,
    }));
  };

  const ToastNotification = ({ visible, message }) => {
    const insets = useSafeAreaInsets();
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
      if (visible) {
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: insets.top,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
          }),
          Animated.delay(2000),
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ]).start();
      }
    }, [visible, insets.top]);

    if (!visible) return null;

    return (
      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [{ translateY }],
          }, themeContainerStyle
        ]}
      >
        <Text style={[styles.copiedText, themeTextStyle]}>{message}</Text>
      </Animated.View>
    );
  };
  const renderResourceLink = (text, leftIcon, onPress, style = {}) => (
    <TouchableOpacity style={styles.resourceButton} onPress={onPress}>
      <View style={styles.resourceLeftContent}>
        <MaterialCommunityIcons
          name={leftIcon}
          size={RFValue(18)}
          color={colorScheme === "light" ? "rgb(15 23 42)" : "rgb(148 163 184)"}
          style={styles.resourceIcon}
        />
        <Text style={[styles.resourceButtonText, themeTextStyle, style]}>
          {text}
        </Text>
      </View>
      <Icon
        name="external-link"
        type="feather"
        size={RFValue(14)}
        color="#A0AEC0"
      />
    </TouchableOpacity>
  );
  const updateIndex = (newIndex) => {
    if (newIndex !== state.selectedIndex) {
      const isMetric = newIndex === 1;
      setState((prevState) => {
        const newRefTemp = isMetric ? 20 : 68;
        const newMatTemp = isMetric ? 26.67 : 80;
        const newLengthVal = isMetric
          ? (prevState.lengthVal * 25.4).toFixed(4)
          : (prevState.lengthVal / 25.4).toFixed(4);

        const currentMaterial =
          items.find((item) => item.value === value) || items[0];
        const newCteVal = isMetric
          ? currentMaterial.cteC
          : currentMaterial.cteF;

        return {
          ...prevState,
          tempUnits: isMetric ? "°C" : "°F",
          measUnits: isMetric ? "(mm)" : "(in)",
          cteCo: isMetric ? "mm/mm °C" : "in/in °F",
          refTemp: newRefTemp,
          matTemp: newMatTemp,
          lengthVal: parseFloat(newLengthVal),
          cteval: newCteVal,
          selectedIndex: newIndex,
        };
      });
    }
  };

  const onPickerValueChange = (selectedValue) => {
    const selectedMaterial =
      items.find((item) => item.value === selectedValue) || items[0];
    const cteValue =
      state.selectedIndex === 1 ? selectedMaterial.cteC : selectedMaterial.cteF;
    setState((prevState) => ({
      ...prevState,
      cteval: cteValue,
    }));
    setValue(selectedValue); // Make sure this line is present
  };

  useEffect(() => {
    updateResults();
  }, [state.lengthVal, state.cteval, state.matTemp, state.refTemp]);

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2600);
  };
  const UnitSwitch = ({ isMetric, onToggle }) => (
    <TouchableOpacity style={styles.unitSwitch} onPress={onToggle}>
      <View style={styles.unitSwitchContent}>
        <View style={styles.unitSwitchLeft}>
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={RFValue(20)}
            color={colorScheme === "light" ? "rgb(15 23 42)" : "rgb(148 163 184)"}


          />
          <View style={styles.unitSwitchTextContainer}>
            <Text style={[styles.unitSwitchText, themeTextStyle]}>
              {isMetric ? "Metric" : "Imperial"}
            </Text>
            <Text style={[styles.unitSwitchSubText, themeSubTextStyle]}>Change display units</Text>
          </View>
        </View>
        <View
          style={[styles.switchTrack, isMetric && styles.switchTrackActive]}
        >
          <Animated.View
            style={[styles.switchThumb, isMetric && styles.switchThumbActive]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderField = (item) => (
    <View>
      {item.type === "picker" ? (
        <TouchableOpacity style={styles.pickerButton} onPress={item.onPress}>
          <MaterialCommunityIcons
            name={item.icon}
            size={RFValue(16)}
            color={colorScheme === "light" ? "rgb(15 23 42)" : "rgb(148 163 184)"}

          />
          <Text style={[styles.pickerButtonText, themeTextStyle]}>{item.text}</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={RFValue(16)}
            color={colorScheme === "light" ? "#64748b" : "rgb(148 163 184)"}
          />
        </TouchableOpacity>
      ) : item.type === "custom" ? (
        item.render()
      ) : (
        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => {
            if (item.type === "result") {
              copyToClipboard(item.value);
            } else if (inputRefs.current[item.key]) {
              inputRefs.current[item.key].focus();
            }
          }}
        >
          <View style={styles.fieldContent}>
            <View style={styles.leftContent}>
              {item.icon && (
                <MaterialCommunityIcons
                  name={item.icon}
                  size={RFValue(20)}
                  color={colorScheme === "light" ? "rgb(15 23 42)" : "rgb(148 163 184)"}

                  style={styles.icon}
                />
              )}
              <View>
                {item.type === "result" ? (
                  <Text style={[styles.resultValue, themeTextStyle]}>{item.value}</Text>
                ) : (
                  <TextInput
                    ref={(ref) => (inputRefs.current[item.key] = ref)}
                    style={[styles.input, themeTextStyle]}
                    value={String(item.value)}
                    onChangeText={item.onChange}
                    keyboardType="numeric"
                    editable={item.type !== "result"}
                  />
                )}
                {item.subText && (
                  <Text style={[styles.subText, themeSubTextStyle]}>{item.subText}</Text>
                )}
              </View>
            </View>
            <View style={styles.rightContent}>
              <Text style={[styles.unit, themeSubTextStyle]}>{item.unit}</Text>
              {item.type !== "result" && (
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={RFValue(16)}
                  color={colorScheme === "light" ? "#64748b" : "rgb(148 163 184)"}


                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSection = (title, items) => (
    <>
      <Text style={[styles.sectionTitle, themeSubTextStyle]}>{title}</Text>
      <View style={[styles.card, themeCardStyle]}>
        {items.map((item, index) => (
          <React.Fragment key={item.key || index}>
            {renderField(item)}
            {index < items.length - 1 && <View style={[styles.separator, themeSeperatorStyle]} />}
          </React.Fragment>
        ))}
      </View>
    </>
  );
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider>
        <View style={[styles.container, themeContainerStyle]}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.content}>
                {renderSection("MATERIALS", [
                  {
                    type: "picker",
                    key: "material",
                    onPress: () => setModalVisible(true),
                    icon: "material-ui",
                    text:
                      items.find((item) => item.value === value)?.label ||
                      "Select a material",
                  },
                  {
                    type: "input",
                    key: "cteval",
                    value: state.cteval,
                    onChange: (cteval) => setState({ ...state, cteval }),
                    unit: state.cteCo,
                    subText: "Coefficient of Thermal Expansion",
                    icon: "alpha",
                  },
                  {
                    type: "custom",
                    render: () => (
                      <UnitSwitch
                        isMetric={state.selectedIndex === 1}
                        onToggle={() =>
                          updateIndex(state.selectedIndex === 0 ? 1 : 0)
                        }
                      />
                    ),
                  },
                ])}

                {renderSection("TEMPERATURES", [
                  {
                    type: "input",
                    key: "lengthVal",
                    value: state.lengthVal,
                    onChange: (lengthVal) => setState({ ...state, lengthVal }),
                    unit: state.measUnits,
                    subText: "Length",
                    icon: "ruler",
                  },
                  {
                    type: "input",
                    key: "refTemp",
                    value: state.refTemp,
                    onChange: (refTemp) => setState({ ...state, refTemp }),
                    unit: state.tempUnits,
                    subText: "Reference Temperature",
                    icon: "thermometer",
                  },
                  {
                    type: "input",
                    key: "matTemp",
                    value: state.matTemp,
                    onChange: (matTemp) => setState({ ...state, matTemp }),
                    unit: state.tempUnits,
                    subText: "Material Temperature",
                    icon: "thermometer-lines",
                  },
                ])}

                {renderSection("RESULTS", [
                  {
                    type: "result",
                    key: "changeInLengthVal",
                    value: state.changeInLengthVal,
                    unit: state.measUnits,
                    subText: "Change in Length",
                    icon: "arrow-expand-horizontal",
                  },
                  {
                    type: "result",
                    key: "totalLengthVal",
                    value: state.totalLengthVal,
                    unit: state.measUnits,
                    subText: "Total Length",
                    icon: "ruler-square",
                  },
                  {
                    type: "result",
                    key: "correctionScaleFactor",
                    value: state.correctionScaleFactor,
                    unit: "",
                    subText: "Correction Scale Factor",
                    icon: "scale-balance",
                  },
                ])}

{renderSection("RESOURCES", [
                  {
                    type: "custom",
                    render: () =>
                      renderResourceLink(
                        "References",
                        "book-open-variant",
                        () => router.push('/details'),
                        { marginLeft: -RFValue(0) } // Only apply margin to References
                      ),
                  },
                  {
                    type: "custom",
                    render: () =>
                      <ResourceLink
                        text="About Verisurf"
                        LeftIcon={VerisurfIcon}
                        onPress={() => Linking.openURL("https://www.verisurf.com/about-verisurf/")}
                        colorScheme={colorScheme}
                      />
                  },
                ])}

                {showCopiedOverlay && (
                  <View style={styles.copiedOverlay}>
                    {/* <Text style={[styles.copiedText, themeSubTextStyle]}>Copied to clipboard!</Text> */}
                  </View>
                )}
              </View>

            </ScrollView>
          </SafeAreaView>
          <ToastNotification
          style={styles.copiedOverlay}
            visible={toastVisible}
            message="Copied to clipboard!"
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={[styles.modalView,]}>
              <ScrollView style={[styles.modalScroll, themeCardStyle]}>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[styles.modalItem, modalItemStyle]}
                    onPress={() => {
                      setValue(item.value);
                      onPickerValueChange(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, themeTextStyle]}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    backgroundColor: "#F0F0F0",
    borderColor: "#007AFF",
    borderRadius: RFValue(10),
    height: RFValue(28),
  },
  buttonText: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  card: {
    backgroundColor: "white",
    borderRadius: RFValue(12),
    marginBottom: RFValue(6),
    overflow: "hidden",
  },
  container: {
    flex: 1,
  },
  darkSeperator: {
borderColor:"rgb(51,65,85)"
  },
  darkContainer: {
    // backgroundColor: "rgba(247, 20, 252, 1)",
    backgroundColor: "rgb(15,23,42)",
  },
  darkCard: {
    backgroundColor: "rgb(30,41,59)",
  },
  darkThemeText: {
    color: "white",
  },
  darkThemeSubText: {
    color: "rgb(148 163 184)",
  },
  lightSeparator:{
    borderColor:"#e2e8f0",
  },
  lightContainer: {
    backgroundColor: "#e2e8f0",
  },
  
  lightCard: {
    backgroundColor: "white",
  },
  lightThemeText: {
    color: "rgb(15 23 42)",
  },
  lightThemeSubText: {
    color: "#64748b",
    borderColor:"rgb(100 116 139",

  },

  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    // backgroundColor: "rgba(30,41,59,0.3)",

  },
  toastText: {
    // color: "white",
    fontSize: RFValue(17),
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: RFValue(12),
  },
  copiedOverlay: {
    // alignItems: "center",
    // bottom: RFValue(16),
    // left: 0,
    // position: "absolute",
    // backgroundColor: "rgba(30,41,59,0.3)",

    // right: 0,
  },
  copiedText: {
    // backgroundColor: "rgba(30,41,59,0.3)",
    // borderRadius: RFValue(4),
    color: "blue",
    fontSize: RFValue(16),
    // padding: RFValue(8),
  },
  fieldContainer: {
    paddingLeft: RFValue(4),
    paddingRight: RFValue(4),
    paddingVertical: RFValue(6),
  },
  fieldContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: RFValue(4),
  },
  flex1: {
    flex: 1,
  },
  icon: {
    marginBottom: RFValue(3),
    marginRight: RFValue(14),
  },
  innerBorder: {
    width: 0,
  },
  input: {
    color: "#4A5568",
    fontSize: RFValue(14),
    fontWeight: "500",
    lineHeight: RFValue(16),
    outlineStyle: "none",
  },
  leftContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  modalItem: {
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingVertical: RFValue(12),
    width: "100%",
  },

  modalItemDark: {
    borderBottomColor: "rgb(51,65,85)",

  },

  modalItemLight: {
    borderBottomColor: "gb(148,163,184)",

  },
  modalItemText: {
    // color: "#4A5568",
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
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "center",
  },
  pickerButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: RFValue(10),
    paddingRight: RFValue(16),
    paddingVertical: RFValue(10),
  },
  pickerButtonText: {
    color: "#4A5568",
    flex: 1,
    fontSize: RFValue(14),
    fontWeight: "500",
    lineHeight: RFValue(16),
    marginLeft: RFValue(16),
    outlineStyle: "none",
  },
  resourceButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: RFValue(4),
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(8),
  },
  resourceButtonText: {
    fontSize: RFValue(12),
    fontWeight: "500",
    marginLeft: RFValue(14),
  },
  unitSwitch: {
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(8),
    marginRight: RFValue(12),
  },
  unitSwitchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unitSwitchLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitSwitchTextContainer: {
    marginLeft: RFValue(13),
  },
  unitSwitchText: {
    fontSize: RFValue(14),
    color: "#4A5568",
    fontWeight: "500",
  },
  unitSwitchSubText: {
    fontSize: RFValue(8),
    color: "#A0AEC0",
    // marginTop: RFValue(2),
  },
  switchTrack: {
    width: RFValue(40),
    height: RFValue(20),
    borderRadius: RFValue(10),
    backgroundColor: "#CBD5E0",
    padding: RFValue(2),
  },
  switchTrackActive: {
    backgroundColor: "#4299E1",
  },
  switchThumb: {
    width: RFValue(16),
    height: RFValue(16),
    borderRadius: RFValue(8),
    backgroundColor: "white",
  },
  switchThumbActive: {
    transform: [{ translateX: RFValue(20) }],
  },
  resourceIcon: {
    marginRight: RFValue(14),
  },
  resourceLeftContent: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: -RFValue(9),
  },
  resultValue: {
    color: "#4A5568",
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  rightContent: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: RFValue(12),
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: RFValue(12),
  },
  sectionTitle: {
    color: "#718096",
    fontSize: RFValue(10),
    fontWeight: "500",
    marginBottom: RFValue(6),
    paddingVertical: RFValue(4),
  },
  selectedButton: {
    backgroundColor: "#007AFF",
  },
  separator: {
    borderBottomWidth: 1,
    // borderColor: "#E2E8F0",
    marginLeft: "auto",
    width: "90%",
  },
  subText: {
    color: "#A0AEC0",
    fontSize: RFValue(8),
  },
  toggleButtons: {
    paddingHorizontal: RFValue(12),
    paddingTop: RFValue(16),
  },
  unit: {
    color: "#718096",
    fontSize: RFValue(12),
    marginRight: RFValue(4),
  },
});
export default Home;
