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
  mv10: {
    marginVertical: 10,
  },
  mt10: {
    marginTop: 10,
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
    marginVertical: 10,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    flex: 1, // Ensure the input takes the rest of the available space
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", 
  },
  listContainer: {
    padding: 20,
  },
  dayItem: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  daySummary: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4
  },
  scrollContainer: {
    paddingHorizontal: 16 ,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
});


export default styles;