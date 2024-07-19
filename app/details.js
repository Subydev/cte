import React, { useContext } from 'react';
import Head from 'expo-router/head';
import { ThemeContext } from './ThemeContext';
import { View, StyleSheet,Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";

const Details = () => {
  const { colorScheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  const themeTextStyle = colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeSubTextStyle = colorScheme === "light" ? styles.lightThemeSubText : styles.darkThemeSubText;
  const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeCardStyle = colorScheme === "light" ? styles.lightCard : styles.darkCard;
  const themeBorderColor = colorScheme === "light" ? styles.lightBorder : styles.darkBorder;
  const rowBorderColor = colorScheme === "light" ? styles.rowBorderLight : styles.rowBorderDark;

 

  const materials = [
    { name: "Aluminum (99.9%)", cteC: 0.000023, cteF: 0.000013 },
    { name: "Aluminum (2024-T4)", cteC: 0.000022, cteF: 0.000012 },
    { name: "Aluminum (6061-T4)", cteC: 0.000024, cteF: 0.0000131 },
    { name: "Aluminum (7075-T6)", cteC: 0.000024, cteF: 0.0000131 },
    { name: "Beryllium", cteC: 0.000012, cteF: 0.0000064 },
    { name: "Beryllium-Copper", cteC: 0.000018, cteF: 0.0000099 },
    { name: "Brass", cteC: 0.000019, cteF: 0.0000104 },
    { name: "Bronze", cteC: 0.000018, cteF: 0.00001 },
    { name: "Copper (99.9%)", cteC: 0.000018, cteF: 0.0000098 },
    { name: "Fiberglass", cteC: 0.000014, cteF: 0.0000079 },
    { name: "Gold", cteC: 0.000015, cteF: 0.0000082 },
    { name: "Graphite", cteC: 0.000008, cteF: 0.0000044 },
    { name: "Invar, Copper Clad", cteC: 0.000006, cteF: 0.0000035 },
    { name: "Iron", cteC: 0.000012, cteF: 0.0000067 },
    { name: "Kovar", cteC: 0.000006, cteF: 0.0000033 },
    { name: "Lead", cteC: 0.000027, cteF: 0.0000151 },
    { name: "Magnesium", cteC: 0.000025, cteF: 0.000014 },
    { name: "Molybdenum", cteC: 0.000005, cteF: 0.000003 },
    { name: "Monel", cteC: 0.000014, cteF: 0.0000075 },
    { name: "Nickel", cteC: 0.000013, cteF: 0.0000072 },
    { name: "Phosphor Bronze", cteC: 0.000018, cteF: 0.0000099 },
    { name: "Silver", cteC: 0.000019, cteF: 0.0000107 },
    { name: "Solder", cteC: 0.000024, cteF: 0.0000134 },
    { name: "Steel", cteC: 0.000013, cteF: 0.0000073 },
    { name: "Stainless Steel 310", cteC: 0.000014, cteF: 0.000008 },
    { name: "Stainless Steel 410", cteC: 0.00001, cteF: 0.0000055 },
    { name: "Tin", cteC: 0.000023, cteF: 0.000013 },
    { name: "Titanium", cteC: 0.000009, cteF: 0.0000048 },
    { name: "Tungsten", cteC: 0.000004, cteF: 0.0000024 },
    { name: "Zinc", cteC: 0.00003, cteF: 0.0000165 },
  ];

  const renderItem = (item, index) => (
    <View key={item.name} style={[
      styles.row, 
      rowBorderColor,
      themeCardStyle,
      themeBorderColor,
    ]}>
      <Text style={[styles.cell, styles.nameCell, themeTextStyle]}>{item.name}</Text>
      <Text style={[styles.cell, themeTextStyle]}>{item.cteC.toExponential(2)}</Text>
      <Text style={[styles.cell, themeTextStyle]}>{item.cteF.toExponential(2)}</Text>
    </View>
  );
  return (
    <>
    <Head>
      <title>CTE Reference Table | Verisurf Software</title>
      <meta name="description" content="Comprehensive Coefficient of Thermal Expansion (CTE) reference table for various materials used in precision manufacturing and measurement." />
      </Head>

    <View style={[styles.container, themeContainerStyle]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top }
        ]}
      >
        <View style={[styles.headerRow]}>
          <Text style={[styles.headerCell, styles.nameCell, themeSubTextStyle]}>Material Name</Text>
          <Text style={[styles.headerCell, themeSubTextStyle]}>mm/mm °C</Text>
          <Text style={[styles.headerCell, themeSubTextStyle]}>in/in °F</Text>
        </View>
        <View style={[styles.card, themeCardStyle]}>
          {materials.map(renderItem)}
        </View>
      </ScrollView>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: RFValue(12),
  },
  rowBorderLight: {
    borderColor: "#e2e8f0",
  },
  rowBorderDark: {
    borderColor: "rgb(51,65,85)",
  },
  card: {
    borderRadius: RFValue(12),
    overflow: 'hidden',
    marginBottom: RFValue(20),
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(4),
    borderRadius: RFValue(12),
  },
  headerCell: {
    flex: 1,
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    borderTopWidth: 1,
  },
  cell: {
    flex: 1,
    fontSize: RFValue(13),
  },
  nameCell: {
    flex: 2,
  },
  lightContainer: {
    backgroundColor: "#f1f5f9",
  },
  darkContainer: {
    backgroundColor: "rgb(15,23,42)",
  },
  lightCard: {
    backgroundColor: "white",
  },
  darkCard: {
    backgroundColor: "rgb(30,41,59)",
  },
  lightThemeText: {
    color: "rgb(15 23 42)",
  },
  darkThemeText: {
    color: "white",
  },
  lightThemeSubText: {
    color: "#64748b",
  },
  darkThemeSubText: {
    color: "rgb(148 163 184)",
  },
  lightBorder: {
    borderColor: '#e2e8f0',
  },
  darkBorder: {
    borderColor: 'rgb(51,65,85)',
  },
});

export default Details;