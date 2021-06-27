import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import Link from 'next/link';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'transparent'
  },
  cardcontent: {
    padding: 16, // default value
    "&:last-child": {
      paddingBottom: 16 // default value is 24
    }
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    background: red[500],
  }
}));

const normalCardStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
      maxWidth: 200,
    },
    minWidth: 500,
    maxWidth: 500,
  },
}))

const pickupCardStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
      maxWidth: 200,
    },
    minWidth: 500,
    maxWidth: 500,
    backgroundColor: 'skyblue'
  },
}))

export const TreeComponent = (tree) => {

  const cardClasses = (tree.id == tree.source) ? pickupCardStyle() : normalCardStyle();
  const classes = useStyles();
  const onMediaFallback = event => event.target.src = "/noimage_transparent.png";
  let avatarChar = tree.hasOwnProperty('id_author') ? tree.id_author.substr(0, 1) : "";
  let mediaURL = typeof tree.thumbnail !== "undefined" ? tree.thumbnail : "/noimage_transparent.png";
  let dateString = typeof tree.update_date !== "undefined" ? format(new Date(tree.update_date), 'yyyy/MM/dd', { timeZone: 'Asia/Tokyo' }) : "unknown";

  return (
    <li>
      <Card variant="outlined" className={cardClasses.root}>
        <CardActionArea component="div">
          <Link href={`/recipe/${tree.id}`}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={8}>
                <CardContent className={classes.cardcontent}>
                  <Typography variant="h5" component="h2">
                    {tree.title}
                  </Typography>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Box>
                      <Avatar className={classes.avatar}>
                        {avatarChar}
                      </Avatar>
                    </Box>
                    <Box style={{ marginLeft: "0.5rem" }}>
                      <Typography variant="body1" color="textSecondary" component="text">
                        {tree.id_author}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary" component="text">
                    last updated: {dateString}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  className={classes.media}
                  image={mediaURL}
                  title={tree.title}
                  onError={onMediaFallback}
                />
              </Grid>
            </Grid>
          </Link>
        </CardActionArea>
      </Card>
      {tree.hasOwnProperty('next') && tree['next'].length > 0 && (<ul>
        {tree.hasOwnProperty('next') && tree['next'].map((item) => (
          <TreeComponent key={item.id} source={tree.source} {...item} />
        ))}
      </ul>)}
    </li>
  )
}