import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles({
  root: {
    maxWidth: '90%',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <div className="col-12 col-md-6 align-c mt-5">
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.comm.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.comm.Name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {
                props.comm.Links.map(link=>{
                    return (
                        <a href={link.Link}>
                        <Chip
                            className ="margin-c"
                            label={link.Name}
                            color="secondary"/>
                        </a>
                    )
                })
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
