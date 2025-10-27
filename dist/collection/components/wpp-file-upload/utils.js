import { iconsList } from '../wpp-icon/const';
export const convertMBToBytes = (size) => size * 1024 ** 2;
export const getExtension = (filename = '') => `.${filename.split('.').pop()}`;
export const getExtensionsList = (acceptConfig) => Object.entries(acceptConfig).reduce((acc, [_, extensions]) => [...acc, ...extensions], []);
export const getBaseName = (fileName = '') => fileName.split('.')[0];
export const renameFile = (file, newFileName) => new File([file], newFileName, { type: file.type });
export const modifyPropertiesOnFile = (file, properties) => new File([file], file.name, { ...properties });
//  * WPPOPENDS-512 WPPOPENDS-311
// Extracting all the icon names from iconsList, to force register and prevent tree shaking during build
export const getIconNames = () => {
  const iconNames = [];
  iconsList.forEach(category => {
    category.groups.forEach(group => {
      group.icons.forEach(icon => {
        iconNames.push(`wpp-icon-${icon.name}`);
      });
    });
  });
  return iconNames;
};
