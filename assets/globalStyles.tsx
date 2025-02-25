import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "rgb(188, 189, 203)",
    borderColor: "rgb(0, 62, 41)",
    borderStyle: "solid",
    borderWidth: 1,





  //   width: 100,
  //   display: 'flex',
  //   margin: 'auto',
  //   // margin: ,
  //   // minWidth: '100px', // only for IE8
  //   maxWidth: '100%',
  // // //   top: '50%', /* Moves button to the middle vertically */
  // //  left: '50%', /* Moves button to the middle horizontally */
  //  textAlign: 'center',
    padding: 5,
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
    color: "rgb(6, 68, 32)",
  },
  formControl: {
    backgroundColor: "rgb(188, 189, 203)",
    // '& div': {
    //   margin: 15
    // }
    // display: "flex",

    // margin: 10,
  },
  input: {
    borderWidth: 1,
    width: 300,
    maxWidth: '100%',
    borderColor: '#ddd',
    padding: 5,
    fontSize: 12,
    borderRadius: 6
  },
  checkbox: {
    backgroundColor: "rgb(188, 189, 203)",
    // borderWidth: 1,
    // width: 200,
    // borderColor: "rgb(188, 189, 203)",
    // padding: 5,
    fontSize: 12,
    // borderRadius: 6
  },
  error: {
    color: 'red'
  },
  inputCell: {
    borderWidth: 1,
    // width: 200,
    borderColor: '#ddd',
    padding: 5,
    margin: 10,
    fontSize: 12,
    borderRadius: 6,
    flex: 1,
    textAlign: "left",

    // backgroundColor: "rgb(188, 189, 203)",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 2,
    // elevation: 1,
    // borderRadius: 5,
    // borderColor: "#fff",
  }
});
