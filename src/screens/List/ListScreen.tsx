import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Styles';
import getListData from '../../services/APICall';
import {Dropdown} from 'react-native-element-dropdown';
import {deviceHeight, deviceWidth, dropDownData} from '../../utils/Constant';
import {ListDataType} from './DataType';
import CommonTextInput from '../commonComponent/CommonTextInput';

const ListUIScreen: React.FC = () => {
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [mainArray, setMainArray] = useState<ListDataType[]>([]);
  const [noOfColumn, setNoOfColumn] = useState<number>(3);
  const [pageNo, setPageNo] = useState<number>(1);
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);

  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [showSelectedImage, setSelectedImage] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>();

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

  const showImage = (item, index) => {
    setCurrentIndex(index);
    setShowFullImage(true);
    setSelectedImage(item?.image);
  };

  const renderListData = ({item, index}: {item: ListDataType}) => {
    return (
      <TouchableOpacity onPress={() => showImage(item, index)}>
        {/* <Text numberOfLines={1} style={{width: deviceWidth / noOfColumn}}>
          {item?.title}
        </Text> */}
        <Image
          source={{uri: item?.image}}
          style={[styles.imgaeStyle, {width: deviceWidth / noOfColumn - 25}]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const searchbyInputField = (inputValue: string) => {
    setSearchText(inputValue);
    setOnFocusInput(false);
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

  const backToList = () => {
    setShowFullImage(false);
  };

  const forwardToNextImage = () => {
    setSelectedImage(listData[currentIndex + 1]?.image);
    setCurrentIndex(currentIndex + 1);
  };
  const backToPrevImage = () => {
    setSelectedImage(listData[currentIndex - 1]?.image);
    setCurrentIndex(currentIndex - 1);
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
      {showFullImage ? (
        <View style={styles.fullViewStyle}>
          <Image
            source={{uri: showSelectedImage}}
            style={styles.selectedImageStyle}
            resizeMode="contain"
          />
          <View style={styles.buttonViewStyle}>
            <Button title="Back" onPress={backToPrevImage} />
            <Button title="Back to List" onPress={backToList} />
            <Button title="Next" onPress={forwardToNextImage} />
          </View>
        </View>
      ) : (
        <View>
          {listData?.length > 0 ? (
            <View style={{height: '90%'}}>
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
            </View>
          ) : (
            <Text style={styles.noDataFoundStyle}>
              No Data Found, Try different one
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default ListUIScreen;
