import React, {useState, useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';
import {KeyboardAvoidingView, TextInput, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const SessionSaveModal = React.memo(({visible, onDelete, onSave}) => {
  const [inputText, setInputText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const textInputRef = React.useRef(null);

  useEffect(() => {
    // https://hsiang.dev/textinput-autofocus-causing-navigation-animation-glitch
		// this glitch might get fixed in future
    let timer = setTimeout(() => textInputRef.current && textInputRef.current.focus(), 10);
    return () => clearTimeout(timer);
  }, [visible]);

  const saveSession = () => {
    setConfirmDelete(false);
    setInputText('');
    onSave();
  };

  const deleteSession = () => {
    if (confirmDelete) {
      setConfirmDelete(false);
      setInputText('');
      onDelete();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => setModalVisible(false)}>
      {console.log('🚀 ~ rendered: SessionSaveModal.js')}
      <BlurView style={styles.blurView} blurType="dark" blurAmount={3} reducedTransparencyFallbackColor="white" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Session Name"
              style={styles.input}
              value={inputText}
              onChangeText={text => setInputText(text)}
              ref={textInputRef}
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
