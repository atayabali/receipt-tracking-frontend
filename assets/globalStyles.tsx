import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(188, 189, 203)",
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "rgb(188, 189, 203)",
  },
  header: {
    backgroundColor: "rgb(188, 189, 203)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 15,
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
    borderColor: "rgb(0, 62, 41)",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    // width: 50,
    // alignItems:'center'
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    // marginBo
    color: "rgb(6, 68, 32)",
  },
});
