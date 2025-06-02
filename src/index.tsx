import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@logicwind/react-native-ssl-pinning' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ReactNativeSSLPinning = NativeModules.SSLPinning
  ? NativeModules.SSLPinning
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function getAvailableCertificates() {
  return ReactNativeSSLPinning.getAvailableCertificates();
}

export function fetchDataWithPinning(url: string, options: any) {
  return ReactNativeSSLPinning.fetchDataWithPinning(url, options);
}