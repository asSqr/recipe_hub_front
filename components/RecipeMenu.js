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
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    width:270,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  avatar: {
    backgroundColor: red[500],
  },
  hover: {
    background: "#f1f1f1",
    '&:hover': {
       background: "#98fb98",
    },
  },
}));

const RecipeMenu = (props) => {

  const classes = useStyles();

  // データの展開
  const { create_date, genre, id, author_name, id_fork_from, id_fork_to_list, name, recipe, show_link, thumbnail, title, update_date, author_photo_url } = props; 

  // 画像がなかった場合の処理
  const onMediaFallback = event => event.target.src = "/noimage_transparent.png";
  
  // 日付の正規化
  var dateRaw = new Date(create_date)
  var date = format(dateRaw, 'yyyy/MM/dd', { timeZone: 'Asia/Tokyo' })

  // 名前の頭文字
  var authorRaw = author_name
  var HeadId = authorRaw.substr(0,1)

  return (
    <Card className={classes.root}>

      {/* ヘッダー */}
      <CardHeader
        avatar={
          author_photo_url && author_photo_url.length > 0 ? 
            (
              <Avatar alt="author" className={classes.avatar} src={author_photo_url} />
            ) :
            (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {HeadId}
              </Avatar>
            )
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={<Link href={`/recipe/${id}`}><h3 style={{margin: 0, cursor: 'pointer'}}>{title}</h3></Link>}
        subheader={<>{author_name}<br />{date}</>}
        />
   
      {/* 写真 */}
      <Link href={`/recipe/${id}`}>
        <CardMedia
          className={classes.media}
          image={thumbnail ? thumbnail : '/noimage_transparent.png'}
          title={name}
          onError={onMediaFallback}
        />
      </Link>
      
      {/* 本文 */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        料理名:{name}<br></br>
        ジャンル:{genre}<br></br>         
        </Typography>
      </CardContent>

      {/* ボタン */}
      <BottomNavigation showLabels>
        <BottomNavigationAction className={classes.hover} label="レシピツリー" href = {`/tree/${id}`}　icon={<AccountTreeIcon />} />
        <BottomNavigationAction className={classes.hover} label="レシピ" href = {`/recipe/${id}`}　icon={<MenuBookIcon />} />
      </BottomNavigation>

    </Card>

  );
}


export default RecipeMenu;