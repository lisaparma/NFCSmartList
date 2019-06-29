import NfcManager, {Ndef} from "react-native-nfc-manager";

export function readOneNFC(): Promise<any> {
  return new Promise((resolve, reject) => {
    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            // this.checkOne(ByteParser.byteToString(tag.ndefMessage[0].payload));
            unregisterNFC()
              .then(log => console.log(log))
              .catch(er => console.warn(er));
            resolve(tag);
          },
          'Hold your device over the tag',
          false,
        ).catch(er => {
          NfcManager.stop();
          console.log("STOP");
          reject("Errore: registerTagEvent");
        })
      })
      .catch(() => reject("Errore: start"))
  });
}

export function unregisterNFC(): Promise<any> {
  return new Promise((resolve, reject) => {
    NfcManager.unregisterTagEvent()
      .then(() => {
        NfcManager.stop();
        resolve("STOP");
      })
      .catch(error => {reject(error)})
  });
}


export function registerTag(): Promise<any> {
  return new Promise((resolve, reject) => {
    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            resolve(tag);
          },
          'Hold your device over the tag',
          true,
        ).catch(er => {
          NfcManager.stop();
          console.log("STOP");
          reject("Errore: registerTagEvent");
        })
      })
      .catch(() => reject("Errore: start"))

  });
}

// Only after registerTag
export function writeTag(text: string): Promise<any> {
  const mess = Ndef.encodeMessage([Ndef.textRecord(text)]);
  return new Promise((resolve, reject) => {
    NfcManager.requestNdefWrite(mess)
      .then(() => {
          unregisterNFC()
            .then(log => console.log(log))
            .catch(er => console.warn(er));
          resolve(text);
        }
      )
      .catch(() => {
        NfcManager.stop();
        console.log("STOP");
        reject("Errore: requestNdefWrite");
      });
  });
}

// Only after registerTag
export function formatTag(text: string): Promise<any> {
  const mess = Ndef.encodeMessage([Ndef.textRecord(text)]);
  return new Promise((resolve, reject) => {
    NfcManager.requestNdefWrite(mess, {format: true})
      .then(() => {
          unregisterNFC()
            .then(log => console.log(log))
            .catch(er => console.warn(er));
          resolve(text);
        }
      )
      .catch(() => {
        NfcManager.stop();
        console.log("STOP");
        reject("Errore: requestNdefWrite");
      });
  });
}

export function cancelWriteTag(): Promise<any> {
  return new Promise((resolve, reject) => {

    NfcManager.cancelNdefWrite()
      .then(() => {
        unregisterNFC()
          .then(log => console.log(log))
          .catch(er => console.warn(er));
        resolve("cancelNdefWrite");
      })
      .catch(() => reject("Errore: cancelNdefWrite"))

  });
}


export function goToSettings() {
  return new Promise((resolve, reject) => {
    NfcManager.start()
      .then(() => {
        NfcManager.goToNfcSetting()
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            NfcManager.stop();
            console.log("STOP");
            reject(error);
          })})
      .catch(er => {
        NfcManager.stop();
        console.log("STOP");
        reject("Errore: registerTagEvent");
      })
  });
}

export function isEnabled() {
  return new Promise((resolve, reject) => {
    NfcManager.start()
      .then(() => {
        NfcManager.isEnabled()
          .then(enabled => {
            resolve(enabled)
          })
          .catch(err => {
            NfcManager.stop();
            console.log("STOP");
            reject(err);
          })
      })
      .catch(er => {
        NfcManager.stop();
        console.log("STOP");
        reject("Errore: registerTagEvent");
      })

  });
}
