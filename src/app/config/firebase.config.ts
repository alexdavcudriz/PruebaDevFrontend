import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { firebaseProperties } from '../../environments/firebase.properties';

const app = initializeApp(firebaseProperties);
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
    minimumFetchIntervalMillis: 0,
    fetchTimeoutMillis: 0
  };
  

remoteConfig.defaultConfig = {
  feature_enabled: false
};

export { remoteConfig };
