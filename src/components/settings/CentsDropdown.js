import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function CentsDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    {label: 'Show', value: 1},
    {label: 'Hide', value: 0},
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

export default CentsDropdown;
