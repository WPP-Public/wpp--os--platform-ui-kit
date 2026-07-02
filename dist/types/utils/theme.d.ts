import { FlatTheme, Theme, ThemeContent } from '../types/theme';
/**
 * Creates flat theme object from theme object
 */
export declare const createTheme: (json: Theme, variant?: keyof ThemeContent) => FlatTheme;
/**
 * Resolve theme object with color values
 */
export declare const resolveTheme: (initJson: Theme, variant?: keyof ThemeContent) => Theme;
export declare const WppAgGridThemeConfig: {
  wrapperBorder: boolean;
  headerRowBorder: boolean;
  rowBorder: {
    style: string;
    width: number;
    color: string;
  };
  backgroundColor: string;
  headerBackgroundColor: string;
  headerColumnBorderHeight: number;
  headerColumnBorder: {
    style: string;
    width: number;
    color: string;
  };
  headerColumnResizeHandleColor: string;
  headerColumnResizeHandleHeight: string;
  headerColumnResizeHandleWidth: number;
  headerCellHoverBackgroundColor: string;
  headerHeight: number;
  rowHeight: number;
  rowHoverColor: string;
  oddRowBackgroundColor: string;
  selectedRowBackgroundColor: string;
  rangeSelectionBorderColor: string;
  cellHorizontalPadding: number;
  fontFamily: string;
  fontSize: number;
};
