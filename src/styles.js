import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgb(32,38,45)',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toneContainer: {
    width: '100%',
    marginTop: 60,
    marginBottom: 30,
  },
  tone: {
    color: '#fff',
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    textAlign: 'center',
    // backgroundColor: 'red',
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
  meta: {
    marginTop: 5,
    marginBottom: 10,
  },
});
