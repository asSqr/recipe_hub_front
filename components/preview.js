import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import RichEditorExample from './markdown'
import { Container } from '@material-ui/core';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import tomatoImg from '../public/tomato.jpg';
import noImage from '../public/noimage_transparent.png';

const useStyles = makeStyles({
  root: {
    width: '20rem',
    height: '20rem',
    textAlign: 'center',
    position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor: 'transparent'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  menu: {
    backgroundImage: `url(${tomatoImg})`,
    width: '60rem',
  },
  content: {
    backgroundColor: 'white',
    width: '50rem',
    margin: 'auto',
    marginTop: '5rem',
    marginBottom: '5rem'
  },
});

const unescapeHtml = target => {
    if( typeof target !== 'string' )
      return target;
  
    const patterns = {
      '&lt;'   : '<',
      '&gt;'   : '>',
      '&amp;'  : '&',
      '&quot;' : '"',
      '&#x27;' : '\'',
      '&#x60;' : '',
      '&#x2F;'  : '/',
    };
  
    return target.replace(/&(lt|gt|amp|quot|#x27|#x60|#x2F);/g, match => {
      return patterns[match];
    });
};

const RecipeItem = (props) => {
  const { id, name, recipe, title, show_link, thumbnail } = props;

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const onMediaFallback = event => event.target.src = noImage;
  
  return (
    <Card className={classes.menu}>
      <CardContent className={classes.content}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          レシピ名
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography> <br />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          料理名
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography> <br />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          サムネイル
        </Typography>
        <CardMedia
          className={classes.media}
          image={thumbnail ? thumbnail : noImage}
          title={name}
          onError={onMediaFallback}
        />
        <br />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          レシピ
        </Typography>
        <div className="markdown-body">
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{__html: `${unescapeHtml(stateToHTML(convertFromRaw(JSON.parse(recipe))))}`,}}
          />
        </div>
      </CardContent>
      
      {show_link ?
        <Link href={`/recipe/${id}`}>
          <Button 
            variant="contained"
            color="primary"
            className={classes.footer}
          >
            レシピページへ
          </Button>
        </Link>
      : 
        <></>}
    </Card>
  );
};

export default RecipeItem;