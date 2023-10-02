import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../../stores/RootStoreProvider';

function InTuneRangeDropdown() {
  const {commonStore} = useRootStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);
  const [items, setItems] = useState([
    {label: '±10 cents', value: 10},
    {label: '±7 cents', value: 7},
    {label: '±5 cents', value: 5},
    {label: '±2 cents', value: 2},
    {label: '±1 cent', value: 1},
  ]);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={value}
      items={items}
      multiple={false}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      showArrowIcon={false}
      defaultValue={value}
      itemSeparator={true}
      showTickIcon={false}
      onChangeValue={v => commonStore.setInTuneRange(v)}
      containerStyle={styles.container}
      placeholderStyle={styles.placeholder}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      textStyle={styles.text}
      itemSeparatorStyle={styles.separator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#fff1',
  },
  placeholder: {
    padding: 0,
  },
  dropdown: {
    backgroundColor: 'rgb(57,56,61)',
    minHeight: 35,
    borderWidth: 0,
  },
  dropdownContainer: {
    backgroundColor: 'rgb(30,30,30)',
    borderWidth: 0,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    padding: 0,
    textAlign: 'center',
  },
});

export default observer(InTuneRangeDropdown);
