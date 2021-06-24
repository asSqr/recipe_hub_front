import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import CardMedia from '@material-ui/core/CardMedia';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width:270,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecipeMenu = (props) => {

  const classes = useStyles();

  // データの展開
  const { create_date, genre, id, id_author, id_fork_from, id_fork_to_list, name, recipe, show_link, thumbnail, title, update_date } = props; 

  // 画像がなかった場合の処理
  const onMediaFallback = event => event.target.src = "/noimage.png";

  // 日付の正規化
  var dateRaw = create_date
  var date = dateRaw.substr(0,10)

  // 名前の頭文字
  var authorRaw = id_author
  var HeadId = authorRaw.substr(0,1)

  return (
    <Card className={classes.root}>

      {/* ヘッダー */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {HeadId}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={id_author}
        subheader={date}
        />
   
      {/* 写真 */}
      <Link href={`/recipe/${id}`}>
        <CardMedia
          className={classes.media}
          image= {thumbnail}
          title={title}
          onError={onMediaFallback}
        />
      </Link>
      
      {/* 本文 */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        料理名:{title}<br></br>
        ジャンル:{genre}<br></br>         
        </Typography>
      </CardContent>

      {/* ボタン */}
      <BottomNavigation showLabels>
        <BottomNavigationAction label="木構造" href = {`/tree/${id}`}　icon={<AccountTreeIcon />} />
        <BottomNavigationAction label="レシピ" href = {`/recipe/${id}`}　icon={<MenuBookIcon />} />
      </BottomNavigation>

    </Card>

  );
}


export default RecipeMenu;