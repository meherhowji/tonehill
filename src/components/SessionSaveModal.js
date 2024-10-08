import React, {useState} from 'react';
import {KeyboardAvoidingView, TextInput, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import { useRootStore } from '../stores'

const SessionSaveModal = React.memo(({visible, onSetModalVisible, onDelete, onSave, sessionId}) => {
	const {stats} = useRootStore()
  const [inputText, setInputText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // const onSave = () => {
  // TODO: save the session
  // };

  const saveSession = () => {
    // TODO: save the stats store session ???
    onSetModalVisible(false);
    setInputText('');
    setConfirmDelete(false);
    onSave();
  };

  const deleteSession = () => {
    // TODO: reset the session, propogate to parent?
    if (confirmDelete) {
			stats.deleteSession(sessionId)
      onSetModalVisible(false);
      setConfirmDelete(false);
      setInputText('');
      onDelete();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => setModalVisible(false)}>
      {console.log('🚀 ~ file: SessionSaveModal.js:65 ~ SessionSaveModal ~ SessionSaveModal:', ' RENDERED')}
      <BlurView style={styles.blurView} blurType="dark" blurAmount={3} reducedTransparencyFallbackColor="white" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Session Name"
              style={styles.input}
              value={inputText}
              onChangeText={text => setInputText(text)}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.buttonSave]} onPress={saveSession}>
                <Text style={styles.textStyle}>SAVE</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={deleteSession}>
                {confirmDelete ? (
                  <Text style={styles.textStyle}>YES, DELETE!</Text>
                ) : (
                  <Text style={styles.textStyle}>DELETE</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    marginTop: 50,
    width: '80%',
    padding: 20,
    backgroundColor: '#1d1d1d',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    flexGrow: 1,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  buttonSave: {
    backgroundColor: 'rgba(152, 191, 100, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  buttonClose: {
    backgroundColor: 'rgba(255, 132, 58, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  textStyle: {
    width: '100%',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SessionSaveModal;
