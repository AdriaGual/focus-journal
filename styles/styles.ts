import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  mv36: {
    marginVertical: 36,
  },
  pb20: {
    paddingBottom: 20
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  inputNumber: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 4,
    marginLeft: 16,
    width: 30,
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  agendaContainer: {
    flexDirection: "column", // Use column to stack tasks, or wrap rows in another container
    flexWrap: "nowrap",
  },
  agendaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: '100%', // Ensure row takes full width
  },
  switchContainer: {
    width: 60, // Give the switch container a fixed width
    marginRight: 10,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    flex: 1, // Ensure the input takes the rest of the available space
  },
});


export default styles;