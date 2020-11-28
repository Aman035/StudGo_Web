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
    marginTop : 20,
    maxWidth : 600,
    width : '90%',
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
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
        <Link to={`/project/${props.project.projectID}`}>
            <BrandCardHeader
                image={props.project.photoUrl}
            />
            <CardContent className={cardStyles.content}>
                <TextInfoContent
                classes={styles}
                overline={"By : "+props.project.author}
                heading={props.project.title}
                />
            </CardContent>
        </Link>
    </Card>
  );
};
export default ProjectCard;