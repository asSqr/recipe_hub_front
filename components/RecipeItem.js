import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

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
  title: {
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: '5px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const RecipeItem = (props) => {
  const { id, name, recipe, id_fork_from, show_link } = props;

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          レシピ名
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <br /> <br />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          レシピ
        </Typography>
        <Typography variant="body2" component="p">
          {recipe}
        </Typography>
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