import { formatTime } from '../util';

describe('# format time', () => {
  it('should format time by sec', () => {
    expect(formatTime(180)).toBe('03:00');
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(179)).toBe('02:59');
  });
  it('should handle negative', () => {
    expect(formatTime(-1)).toBe('00:00');
  });
});
