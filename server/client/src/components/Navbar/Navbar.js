import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import world from '../../images/world.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }

        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to="/"  className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h1' align='center'>World Attractions</Typography>
            <img className={classes.image} src={world} alt='world' height='55px'/>
        </Link>
        <Toolbar className={classes.toolbar}>
            { user ? (
                <div className={ classes.profile }>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{ user.result.name.charAt(0) }</Avatar>
                    <Typography className={ classes.userName } variant='h6'>{ user.result.name }</Typography>
                    <Button variant='contained' className={ classes.logout } color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button variant='contained' component={Link} to='/auth' color='primary'>Sign in</Button>
            ) }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;