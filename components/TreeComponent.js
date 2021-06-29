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
  let avatarChar = tree.hasOwnProperty('author_name') ? tree.author_name.substr(0, 1) : "";
  let mediaURL = typeof tree.thumbnail !== "undefined" ? tree.thumbnail : "/noimage_transparent.png";
  let dateString = typeof tree.update_date !== "undefined" ? format(new Date(tree.update_date), 'yyyy/MM/dd', { timeZone: 'Asia/Tokyo' }) : "unknown";

  useEffect(() => {
    const elems = document.querySelectorAll('li:not(:last-child)');

    for( const el of elems ) {
      el.parentNode.classList.add('ul-border');
      const styleElem = el.parentNode.appendChild(document.createElement("style"));
      styleElem.innerHTML = `.ul-border:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 5vw;
  width: 0;
  height: auto;
    
  border-left: 5px solid black;
}`;
    }
  }, []);

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