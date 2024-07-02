import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import styles from './Styles';
import getListData from '../../services/APICall';
import {Dropdown} from 'react-native-element-dropdown';
import {deviceWidth, dropDownData} from '../../utils/Constant';
import {ListDataType} from './DataType';
import CommonTextInput from '../commonComponent/CommonTextInput';

const ListUIScreen: React.FC = () => {
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [mainArray, setMainArray] = useState<ListDataType[]>([]);
  const [noOfColumn, setNoOfColumn] = useState<number>(3);
  const [pageNo, setPageNo] = useState<number>(1);
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);

  // Get the List Of Data Via API Call
  const getData = async () => {
    const apiData = await getListData(pageNo);
    setListData(apiData);
    setMainArray(apiData);
  };


  useEffect(() => {
    async function asyncCall() {
      await getData();
    }
    asyncCall();
  }, [pageNo]);


  const renderListData = ({item}: {item: ListDataType}) => {
    return (
      <View>
        {/* <Text numberOfLines={1} style={{width: deviceWidth / noOfColumn}}>
          {item?.title}
        </Text> */}
        <Image
          source={{uri: item?.image}}
          style={[styles.imgaeStyle, {width: deviceWidth / noOfColumn - 25}]}
        />
      </View>
    );
  };

  const searchbyInputField = (inputValue: string) => {
    setSearchText(inputValue);
    inputValue = inputValue.toLowerCase();
    if (inputValue === '') {
      setListData(mainArray);
    } else {
      let filteredListData = mainArray.filter(filterData =>
        filterData?.title.toLowerCase().includes(inputValue),
      );
      setListData(filteredListData);
    }
  };

  const loadMore = async () => {
    if (onFocusInput) {
      const nextPage = pageNo + 1;
      setPageNo(nextPage);
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Text style={styles.welcomeTextStyle}>Welcome</Text>
      {/* TextInput imported from Common Component */}
      <CommonTextInput
        placeholder="Search by Title"
        style={styles.searchInputTextStyle}
        value={searchText}
        onChangeText={text => searchbyInputField(text)}
        onFocus={() => setOnFocusInput(false)}
      />

      <View style={styles.dropdownViewStyle}>
        <Text style={styles.noOfColumns}>
          Choose Number of Columns to Display List:
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropDownData}
          iconColor="gray"
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={String(noOfColumn)}
          value={String(noOfColumn)}
          onChange={item => {
            setNoOfColumn(item?.value);
          }}
        />
      </View>

      {listData?.length > 0 ? (
        <FlatList
          data={listData}
          renderItem={renderListData}
          numColumns={noOfColumn}
          key={noOfColumn}
          keyExtractor={item => item?.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          onScroll={() => setOnFocusInput(true)}
        />
      ) : (
        <Text style={styles.noDataFoundStyle}>
          No Data Found, Try different one
        </Text>
      )}
    </SafeAreaView>
  );
};
export default ListUIScreen;
