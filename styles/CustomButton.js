import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// ボタンにMaterial UIのカラーを指定可能にするボタン
// https://qiita.com/shikigamix/items/46d282e3125b3750f6fc
const CustomButton = (props) => {
  const customTheme = theme => ({
    root: {
      color: theme.palette.getContrastText(props.themeColor[500]),
      backgroundColor: props.themeColor[500],
      '&:hover': {
        backgroundColor: props.themeColor[700],
      },
    },
  })
  const ComponentName = withStyles(customTheme)(Button)
  return <ComponentName {...props} />
}

export default CustomButton