/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {notes} from '../utils/mappings';
import {useRootStore} from '../stores';
import {observer} from 'mobx-react-lite';

const UserKey = observer(() => {
  const {common} = useRootStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('C#');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const notesList = notes.map(v => ({
      label: v,
      value: v,
    }));
    setItems(notesList);
  }, []);

  return (
    // need to move this to common
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View style={styles.container}>
        <DropDownPicker
          multiple={false}
          open={open}
          value={`Key: ${value}`}
          onSelectItem={v => common.setUserKey(v?.value)}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showArrowIcon={false}
          listMode={'SCROLLVIEW'}
          dropDownDirection={'DOWN'}
          placeholder={`Key: ${value}`}
          containerStyle={{
            width: 77,
          }}
          listItemContainer={{
            height: 40,
            // justifyContent: 'center'
          }}
          placeholderStyle={{
            padding: 0,
            fontWeight: 'bold',
          }}
          style={{
            padding: 0,
            minHeight: 30,
            borderRadius: 4,
            backgroundColor: 'rgba(38,38,38,0)',
            borderColor: '#fff1',
          }}
          textStyle={{
            color: 'white',
            fontSize: 14,
            fontFamily: 'RobotoMono-Medium',
            padding: 0,
            textTransform: 'uppercase',
          }}
          dropDownContainerStyle={{
            backgroundColor: 'rgb(30,30,30)',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff1',
          }}
          listItemLabelStyle={{
            textAlign: 'center',
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'cyan',
  },
});

export {UserKey};
