import React, { useEffect } from 'react';
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
import noImage from '../public/noimage_transparent.png';
import { truncate } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  media: {
    marginTop: 10,
    marginBottom: 10,
    width: 260,
    height: 220,
    backgroundColor: 'transparent'
  },
  cardcontent: {
    padding: 16, // default value
    "&:last-child": {
      paddingBottom: 16 // default value is 24
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 360
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
      minWidth: '200px',
      maxWidth: '200px',
    },
    minWidth: '290px',
    maxWidth: '290px',
    minHeight: '360px',
    maxHeight: '360px',
	  position: 'relative',
    display: 'inline-block',
    overflow: 'hidden'
  },
  ul: {
    paddingTop: '40px',
    position: 'relative'
  },
  li: {
    paddingTop: '40px',
    position: 'relative'
  },
  wrapper: {
    marginTop: '-5px',
    overflow: 'hidden'
  }
}))

const pickupCardStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      minWidth: '200px',
      maxWidth: '200px',
    },
    minWidth: '290px',
    maxWidth: '290px',
    minHeight: '360px',
    maxHeight: '360px',
    backgroundColor: '#fff59d',
	  position: 'relative',
    display: 'inline-block',
    overflow: 'hidden'
  },
}))

export const TreeComponent = (tree) => {
  const classes = useStyles();
  const pickupCardClasses = pickupCardStyle();
  const normalCardClasses = normalCardStyle();
  const cardClasses = (tree.id == tree.source) ? pickupCardClasses : normalCardClasses;
  const onMediaFallback = event => event.target.src = noImage;
  let avatarChar = tree.hasOwnProperty('author_name') ? tree.author_name.substr(0, 1) : "";
  let mediaURL = typeof tree.thumbnail !== "undefined" ? tree.thumbnail : noImage;
  let dateString = typeof tree.update_date !== "undefined" ? format(new Date(tree.update_date), 'yyyy/MM/dd', { timeZone: 'Asia/Tokyo' }) : "unknown";

  useEffect(() => {
    
  }, []);

  return (
    <li className={cardClasses.li}>
      <Card variant="outlined" className={cardClasses.root}>
        <CardActionArea component="div">
          <Link href={`/recipe/${tree.id}`}>
            <Grid container alignItems="center">
              <CardContent className={classes.cardcontent}>
                <Typography variant="h5" component="h2">
                  {truncate(tree.title, 20)}
                </Typography>
                <CardMedia
                  className={classes.media}
                  image={mediaURL}
                  title={tree.title}
                  onError={onMediaFallback}
                />
                <Box display="flex" flexDirection="column" justifyContent="flex-end">
                  <Box display="flex" flexDirection="row" style={{ marginTop: "0.5rem" }}>
                    <Box>
                    {
                      tree.author_photo_url && tree.author_photo_url.length > 0 ? 
                        (
                          <Avatar alt="author" className={classes.avatar} src={tree.author_photo_url} />
                        ) :
                        (
                          <Avatar className={classes.avatar}>
                            {avatarChar}
                          </Avatar>
                        )
                    }
                    </Box>
                    <Box style={{ marginLeft: "0.5rem" }}>
                      <Typography variant="body1" color="textSecondary" component="text">
                        {tree.author_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box align="left" style={{ marginTop: "0.5rem", marginBottom: "0rem" }}>
                    <Typography variant="body2" color="textSecondary" component="text">
                      {dateString}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Link>
        </CardActionArea>
      </Card>
      {tree.hasOwnProperty('next') && tree['next'].length > 0 && (<div className={cardClasses.wrapper}><ul className={cardClasses.ul}>
        {tree.hasOwnProperty('next') && tree['next'].map((item) => (
          <TreeComponent key={item.id} source={tree.source} {...item} />
        ))}
      </ul></div>)}
    </li>
  )
}