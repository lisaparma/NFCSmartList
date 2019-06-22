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


export function writeTag(text: string): Promise<any> {
  const mess = Ndef.encodeMessage([Ndef.textRecord(text)]);
  return new Promise((resolve, reject) => {

    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            NfcManager.requestNdefWrite(mess)
              .then(() => {
                  unregisterNFC()
                    .then(log => console.log(log))
                    .catch(er => console.warn(er));
                  resolve(text);
                }
              )
              .catch(() => reject("Errore: requestNdefWrite"))
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