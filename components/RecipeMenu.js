import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { getDisplayName } from 'next/dist/next-server/lib/utils';

// Material UI
// https://material-ui.com/components/cards/

const useStyles = makeStyles({
  root: {
    width: '20rem',
    height: '20rem',
    textAlign: 'center',
    position: 'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  media: {
    height: 140,
  },

  title: {
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: '5px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  text: {
    textAlign: "left"
  }
});

const RecipeMenu = (props) => {
  // console.log(props)

  const { create_date, genre, id, id_author, id_fork_from, id_fork_to_list, name, recipe, show_link, thumbnail, title, update_date } = props;

  const classes = useStyles();
  const onMediaFallback = event => event.target.src = "/noimage.png";

  // const bull = <span className={classes.bullet}>•</span>;

  // 日付の正規化
  var dateRaw = create_date
  var date = dateRaw.substr( 0, 10 )

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={`/recipe/${id}`}>
          <CardMedia
            className={classes.media}
            image="/noimage.png"
            title={name}
            onError={onMediaFallback}
          />
        </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <div className={classes.text}>
            作成日:{date}<br></br>
            ジャンル:{genre}<br></br>
            作成者:{id_author}
            </div>
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <CardActions>

        <Button variant="contained" color="primary" href= {`/tree/${id}`}>
          木構造確認
        </Button>
        <Button variant="contained" color="primary" href={`/recipe/${id}`}>
          レシピ表示
        </Button>

      </CardActions>
    </Card>
  );
}


export default RecipeMenu;