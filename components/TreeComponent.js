import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardcontent: {
    padding: 16, // default value
    "&:last-child": {
      paddingBottom: 16 // default value is 24
    }
  },
}));

export const TreeComponent = (tree) => {

  const classes = useStyles();
  const onMediaFallback = event => event.target.src = "/noimage.png";

  return (
    <li>
      <Card variant="outlined">
        <CardActionArea component="div">
          <Link href={`/recipe/${tree.id}`}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8}>
                <CardContent className={classes.cardcontent}>
                  <Typography variant="h5" component="h2">
                    {tree.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="text">
                    {tree.name}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={4}>
                <CardMedia
                  className={classes.media}
                  image="/noimage.png"
                  title="Image"
                  onError={onMediaFallback}
                />
              </Grid>
            </Grid>
          </Link>
        </CardActionArea>
      </Card>
      <ul>
        {tree.hasOwnProperty('next') && tree['next'].map((item) => (
          <TreeComponent key={item.id} {...item} />
        ))}
      </ul>
    </li>
  )
}