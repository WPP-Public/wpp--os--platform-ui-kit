import { format } from './utils';
import { getHighlightData } from './utils';
import { getOsBarOffsetHeight } from './utils';
describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('');
  });
  it('formats just first names', () => {
    expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
  });
  it('formats first and last names', () => {
    expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });
  it('formats first, middle and last names', () => {
    expect(format('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique');
  });
});
describe('given getHighlightData', () => {
  it('returns proper parts', () => {
    expect(getHighlightData('', 'ea')).toEqual({
      firstPart: '',
      highlight: '',
      secondPart: '',
    });
    expect(getHighlightData('team from devs', '')).toEqual({
      firstPart: '',
      highlight: '',
      secondPart: 'team from devs',
    });
    expect(getHighlightData('team from devs', 'ea')).toEqual({
      firstPart: 't',
      highlight: 'ea',
      secondPart: 'm from devs',
    });
    expect(getHighlightData('team from devs', 'te')).toEqual({
      firstPart: '',
      highlight: 'te',
      secondPart: 'am from devs',
    });
    expect(getHighlightData('team from devs', 'vs')).toEqual({
      firstPart: 'team from de',
      highlight: 'vs',
      secondPart: '',
    });
    expect(getHighlightData('team from devs', 'team ')).toEqual({
      firstPart: '',
      highlight: 'team ',
      secondPart: 'from devs',
    });
    expect(getHighlightData('team from devs', 'team f')).toEqual({
      firstPart: '',
      highlight: 'team f',
      secondPart: 'rom devs',
    });
  });
});
describe('getOsBarOffsetHeight', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  it('returns the OS bar header offsetHeight when .wpp > header exists', () => {
    const root = document.createElement('div');
    root.id = 'root';
    const wppContainer = document.createElement('div');
    wppContainer.className = 'wpp';
    const header = document.createElement('header');
    Object.defineProperty(header, 'offsetHeight', { value: 72, configurable: true });
    wppContainer.appendChild(header);
    root.appendChild(wppContainer);
    document.body.appendChild(root);
    expect(getOsBarOffsetHeight()).toBe(72);
  });
  it('returns default 64 when .wpp > header does not exist', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    expect(getOsBarOffsetHeight()).toBe(64);
  });
  it('returns default 64 when no root container is found', () => {
    expect(getOsBarOffsetHeight()).toBe(64);
  });
});
