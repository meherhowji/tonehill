import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tone: {
    marginBottom: 10,
    fontSize: 150,
    fontWeight: 'bold',
    opacity: 0.6,
    fontFamily: 'Righteous',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 30,
    backgroundColor: '#555',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  frequency: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    marginTop: 5,
    marginBottom: 10,
  },
});
