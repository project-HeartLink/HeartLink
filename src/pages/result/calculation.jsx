import { themesArr } from "../main/themesArr";
import Syncronization from "./SynchronizationRate";

export const AryMax = function (a, b) {
  return Math.max(a, b);
};

export const Calculation = (mainArrPlayer, subArrPlayer, selectArr) => {
  let beatmax = 0; //心拍の借りの最大値
  let keymax = []; //心拍の最大値が配列のどこにあるかを示す
  let syncromax = 0;
  let keymaxSyncro = "0";
  let maxArrSelectTopic = [];
  const themes = themesArr; //locateで値を受け取る

  //最大心拍と、配列のどこにあるかを求める
  for (const key in mainArrPlayer) {
    const arrbeats = mainArrPlayer[key].map(Number); //心拍の配列をnumber型に

    if (beatmax < arrbeats.reduce(AryMax)) {
      //arrbeats.reduce(AryMax)で1お題ごとの最大の心拍を出してる。そこから全体の最大心拍を求めてる
      beatmax = arrbeats.reduce(AryMax);
      keymax = [key]; // 新しい最大値なので配列をリセット
    } else if (beatmax == arrbeats.reduce(AryMax)) {
      keymax.push(key);
    }

    console.log(
      "Syncronization(p1)",
      Syncronization({
        heartRate1: mainArrPlayer[key].map(Number),
        heartRate2: subArrPlayer[key].map(Number),
      })
    );

    const syncro = Syncronization({
      heartRate1: mainArrPlayer[key].map(Number),
      heartRate2: subArrPlayer[key].map(Number),
    });

    console.log("type", typeof key);

    if (syncromax < syncro) {
      syncromax = syncro;
      keymaxSyncro = key;
    }
  }

  console.log("keymaxSyncro", selectArr[keymaxSyncro]);
  console.log("keymaxSyncroTheme", themes[selectArr[keymaxSyncro]].topic);

  const syncrotheme = themes[selectArr[keymaxSyncro]];

  keymax.map(Number).map((key) => {
    for (const topicId in selectArr) {
      if (topicId == key) {
        console.log(themes[selectArr[key]].topic);
        maxArrSelectTopic.push(themes[selectArr[key]].topic);
      }
    }
  });

  return {
    beatmax,
    keymax,
    maxArrSelectTopic,
    syncromax,
    syncrotheme,
    keymaxSyncro,
  };
};
