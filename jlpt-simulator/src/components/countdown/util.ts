const fill = (input: string | number): string => {
  const addZero = `0${input}`;
  return addZero.substr(addZero.length - 2, 2);
};

export const formatTime = (sec: number): string => {
  if (sec < 0) {
    return '00:00';
  }
  const minute = Math.floor(sec / 60);
  const second = sec % 60;
  return `${fill(minute)}:${fill(second)}`;
};
