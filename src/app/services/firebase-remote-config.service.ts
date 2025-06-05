import { Injectable } from '@angular/core';
import { remoteConfig } from '../config/firebase.config';
import { fetchAndActivate, getBoolean } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRemoteConfigService {
  async getFeatureFlag(flagKey: string): Promise<boolean> {
    try {
      await fetchAndActivate(remoteConfig);
      return getBoolean(remoteConfig, flagKey);
    } catch (error) {
      console.error('Error al obtener Remote Config:', error);
      return false;
    }
  }
}
