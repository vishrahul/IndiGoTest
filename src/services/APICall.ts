import {Alert} from 'react-native';
import {baseURL, numberOfData} from '../utils/Constant';

const getListData = (pageNo: number) => {
  const noOfData = pageNo * numberOfData;
  const endPoint = baseURL + '/products?limit=' + noOfData;

  return fetch(endPoint)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      Alert.alert(
        'Error',
        'Opps, someting went wronng. Please try again later.',
      );
      throw error;
    });
};

export default getListData;
