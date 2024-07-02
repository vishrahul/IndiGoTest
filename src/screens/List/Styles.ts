import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    padding: 5,
    margin: 5,
  },
  searchInputTextStyle: {
    width: '95%',
    height: 45,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imgaeStyle: {
    width: 200,
    height: 250,
    padding: 10,
    margin: 10,
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 10,
  },

  dropdownViewStyle: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '40%',
  },
  label: {
    height: 0,
    width: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginRight: -8,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
  },
  noOfColumns: {
    width: '50%',
    fontSize: 10,
    fontWeight: '600',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  welcomeTextStyle: {
    width: '90%',
    fontSize: 22,
    fontWeight: '700',
    margin: 10,
  },
  noDataFoundStyle: {
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
    alignSelf: 'center',
    marginTop: 200,
    borderWidth: 1,
    padding: 10,
  },
});

export default styles;
