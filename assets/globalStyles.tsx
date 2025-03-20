import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(188, 189, 203)",
  },
  searchBarContainer: {
    marginTop: 5,
    backgroundColor: "rgb(188, 189, 203)",
    borderTopColor: "rgb(188, 189, 203)",
    
    borderBottomColor: "rgb(188, 189, 203)",
  },
  searchInputContainer: {
    backgroundColor: "rgb(73, 73, 76)",
  },
  searchBar: {
    height: 35, // Smaller height
    backgroundColor: "rgb(188, 189, 203)", // Darker background
    borderRadius: 10,
    elevation: 2, // Shadow effect for Android
  },
  searchInput: {
    fontSize: 14, // Smaller text
    color: "rgb(6, 68, 32)" ///"#fff", // White text
  },
  imgContainer: {
    flex: 1,
    backgroundColor: "rgb(188, 189, 203)",
    alignItems: 'center'
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "rgb(188, 189, 203)",
  },
  columnName: {
    flex: 1,
    fontSize: 16,
  },
  row: {
    backgroundColor: "rgb(188, 189, 203)",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 5,
    borderColor: "#fff",
  },
  cell: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  },
  clickableCell: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  buttonStyle: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: 350,
    height: 550,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "rgb(6, 68, 32)",
  },
  formControl: {
    backgroundColor: "rgb(188, 189, 203)",
  },
  input: {
    borderWidth: 1,
    width: 350,
    maxWidth: '100%',
    borderColor: '#ddd',
    padding: 5,
    fontSize: 12,
    borderRadius: 6,
    marginBottom: 5
  },
  checkbox: {
    backgroundColor: "rgb(188, 189, 203)",
    fontSize: 12,
  },
  error: {
    padding: 10,
    color: 'red'
  },
  inputCell: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    margin: 10,
    fontSize: 12,
    borderRadius: 6,
    flex: 1,
    textAlign: "left",
  },
  header: {
    height: 50,
    backgroundColor: "rgb(188, 189, 203)",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(6, 68, 32)",
  },
  tableBorder: {
    borderWidth: 3,
    borderColor: "rgb(6, 68, 32)",
  },
  cellText: { margin: 2, fontSize: 14, textAlign: "center" },
  tableRow: { flexDirection: "row", backgroundColor: "rgb(188, 189, 203)" },
  actionsColumn: { backgroundColor: "rgb(188, 189, 203)" },
});
