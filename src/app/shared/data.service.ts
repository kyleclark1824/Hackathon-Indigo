import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    user = 'browser@ionic.com';
    pass = 'thisisatest';
    userEnrollmentUrl = undefined;
    defaultEnrollmentUrl = undefined;
    sdk = undefined;

    constructor() {
        this.defaultEnrollmentUrl = 'https://enroll.ionicsecurity.com/champagne';

        if (this.sdk) {
            return;
        } else {

            // @ts-ignore
            // this.sdk = new window.IonicSdk.ISAgent('https://api.ionic.com/jssdk/latest/');
            this.sdk = new window.IonicSdk.ISAgent('https://api.deveng.ionic.engineering/jssdk/latest/');
        }
    }

    RegisterUser() {
        let userData = {
            appId: 'hackathon',
            userId: this.user,
            userAuth: this.pass,
        };

        return this.sdk
            .loadUser(userData)
            .then(res => {
                return this.makeRegisterCall();
            })
            .catch(err => {
                if (
                    err &&
                    err.sdkResponseCode &&
                    (err.sdkResponseCode === 40022 || err.sdkResponseCode === 40002)
                ) {
                    return this.makeRegisterCall();
                }
            });
    }

    makeRegisterCall() {
        let enrollmentData = {
            appId: 'viewer',
            userId: this.user,
            userAuth: this.pass,
            enrollmentUrl: 'https://enrollment.deveng.ionic.engineering/keyspace/NYMy/register'
        };

        return this.sdk
            .enrollUser(enrollmentData)
            .then(resp => {
                if (resp) {
                    if (resp.redirect) {
                        window.open(resp.redirect);
                        return resp.Notifier;
                    }
                } else {
                    return Promise.reject('Error during registration');
                }
            });
    }

    LoadUser() {
        return this.sdk
            .loadUser({
                appId: 'viewer',
                userId: this.user,
                userAuth: this.pass,
            })
            .then(res => {
                return Promise.resolve();
            })
            .catch(err => {
                return this.makeRegisterCall();
            });
    }

    encryptString(data, cipher = 'v2') {
        return this.sdk
            .encryptStringChunkCipher({ stringData: data, cipher: cipher})
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log('err: ', err);
            });
    }

     decryptString(data) {
        return this.sdk
            .decryptStringChunkCipher({ stringData: data })
            .then(res => {
                console.log('decrypted: ', res);
                return res;
            });
    }

}
