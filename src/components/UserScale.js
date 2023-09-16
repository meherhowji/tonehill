/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../stores/RootStoreProvider';

const UserScale = observer(() => {
  const {commonStore} = useRootStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('major');
  const [items, setItems] = useState([
    {
      label: 'Major',
      value: 'major',
    },
    {
      label: 'Minor',
      value: 'minor',
    },
  ]);

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View style={styles.container}>
        <DropDownPicker
          multiple={false}
          open={open}
          value={`Scale: ${value}`}
          onSelectItem={v => commonStore.setUserScale(v.value)}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showArrowIcon={false}
          dropDownDirection={'TOP'}
          placeholder={`Scale: ${value}`}
          containerStyle={{
            width: 116,
          }}
          listItemContainer={{
            height: 40,
          }}
          placeholderStyle={{
            padding: 0,
            fontWeight: 'bold',
          }}
          style={{
            padding: 0,
            backgroundColor: 'rgb(38,38,38)',
            minHeight: 30,
            borderRadius: 4,
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
    alignSelf: 'flex-start',
    // backgroundColor: 'cyan',
    padding: 15,
    paddingLeft: 0,
  },
});

export {UserScale};
