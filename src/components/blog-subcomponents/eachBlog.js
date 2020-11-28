import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    maxWidth: 700,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}));
function ProjectCard(props) {
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();


    var date =props.blog.createdAt;

    if(date !==null)
    {
      date = new Date(date.seconds*1000 + 19800000)
      date = date.toISOString().split('T')[0];
    }
    else
    {
      date = new Date()
      date = date.toISOString().split('T')[0];
    }

    // function handleLike(blog,user){
    //     var like = blog.likes[user];
    //     if(like === undefined || like === false)
    //       blog.likes[user] = true;
    //     else
    //     blog.likes[user] = false;

    //     console.log(blog.likes[user]);

    //     updateBlog(blog);
    // }


  return (
    <div className="cphead">
    <Link to={`/blog/${props.blog.blogID}`}>
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        image={
          props.blog.photo
        }
        extra={date}
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          className ="blog"
          overline={"By : "+props.blog.author}
          heading={props.blog.title}
        />
      </CardContent>
    </Card>
    </Link>
    </div>
  );
};

export default ProjectCard;