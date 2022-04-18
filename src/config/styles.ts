import {createTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';

export const AppColorPalette = {
  orange: '#F26430',
};

export const myTheme = createTheme({
  Button: props =>
    props.mode === 'warning'
      ? {
          titleStyle: {
            fontFamily: 'WorkSans-Regular',
            color: 'black',
            fontSize: 13,
            fontWeight: '600',
          },
          buttonStyle: {
            backgroundColor: '#F8EFA0',
            width: 200,
            height: 40,
          },
        }
      : {
          titleStyle: {
            fontFamily: 'WorkSans-Regular',
            color: 'white',
            fontWeight: '600',
          },
          buttonStyle: {
            backgroundColor: '#F26430',
            width: 300,
            height: 55,
          },
        },
  Input: {
    style: {
      fontFamily: 'WorkSans-Regular',
      fontWeight: '400',
    },
  },
  Text: props => {
    switch (props.type) {
      case 'label':
        return {
          style: {
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'description':
        return {
          style: {
            fontSize: 16,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'header':
        return {
          style: {
            fontSize: 22,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'info':
        return {
          style: {
            fontSize: 14,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      default: {
        return {
          style: {
            fontFamily: 'WorkSans-Regular',
          },
        };
      }
    }
  },
});

export const DEFAULT_APP_COLOR = '#F6F5F5';

export const commonStyles = StyleSheet.create({
  FlexColCenterCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  FlexColCenterStart: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  FlexGrow: {
    flexGrow: 1,
  },
  Underline: {
    textDecorationLine: 'underline',
  },
});
