declare var window: any;

export const keepAwake = () => {
  return new Promise((resolve,reject)=>{
    resolve(window.plugins.insomnia.keepAwake());

  })
};

export const allowDeviceSleep = () => {
  return new Promise((resolve,reject)=>{
    resolve(window.plugins.insomnia.allowSleepAgain());

  })
};