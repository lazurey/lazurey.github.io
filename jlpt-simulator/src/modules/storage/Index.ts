export const BrowserStorage = {
  setItem: (key: string, value: any) => {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }).catch((e: any) => {
      console.error(e);
    });
  },
  getItem: (key: string) => {
    return Promise.resolve().then(() => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) {
        return undefined;
      }
      try {
        const obj = JSON.parse(storedValue);
        return obj;
      } catch (e) {
        console.log(e);
        console.log('parse json object error');
        return undefined;
      }
    }).catch((e: any) => {
      console.error(e);
      return undefined;
    });
  },
  removeItem: (key: string) => {
    return Promise.resolve().then(() => {
      return localStorage.removeItem(key);
    }).catch((e: any) => {
      console.error(e);
    });
  },
};
