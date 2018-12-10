import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AuthService from './AuthService';
import './css/resources.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    marginTop: '12%',
  },
  image: {
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 50,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    fontSize: 15,
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=a010291124bf',
    title: 'Stack Overflow',
    width: '40%',
    link: 'https://stackoverflow.com/',
  },
  {
    url: 'http://code.google.com/images/developers.png',
    title: 'Google Code',
    width: '30%',
    link: 'https://code.google.com/',
  },
  {
    url: 'https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-logo.svg?v=d29f0785ebb7',
    title: 'Stack Exchange',
    width: '30%',
    link: 'https://stackexchange.com/',
  },
];

class ButtonBases extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
  }
  render () {
    const { classes } = this.props;
    const imgSrc = "http://getwallpapers.com/wallpaper/full/4/f/c/1043875-top-beach-sunrise-wallpaper-1920x1200-for-iphone-7.jpg";

    if (!this.Auth.loggedIn()) {
      return <Redirect to='/login' />
    }
    return (
      <div className={classes.root}>
      <img src={imgSrc} className="bg" alt="Mountain Lake "/>
        <h1 className = "Header"> Still stuck? We recommend looking to these resources to get ahead. </h1>
        {images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <a href = {image.link} target="_blank" rel="noopener noreferrer">
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </a>
          </ButtonBase>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(ButtonBases);
