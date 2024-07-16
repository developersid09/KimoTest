/* eslint-disable no-empty */
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) { }
};

const storeObjectKeyItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) { }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) { }
  return null;
};

const getObjectItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null && jsonValue != null) {
      return JSON.parse(jsonValue);
    } else {
      return null;
    }
  } catch (e) { }
  return null;
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) { }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    global.token = null;
  } catch (e) { }
};

export {
  getItem,
  storeItem,
  getObjectItem,
  storeObjectKeyItem,
  removeItem,
  clearAll,
};
