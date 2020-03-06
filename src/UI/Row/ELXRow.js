import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'
import useStyles from './ELXRow.styles';

const ELXRow=(props)=>{

    const classes=useStyles();

    return (
        <Box 
            {...props}   
        >
        {  props.children }
        </Box>
    );
}

ELXRow.propTypes={
    children:PropTypes.any,
    component:PropTypes.string,
}

ELXRow.defaultProps={
    children:'',
    component:'div'
}



export default ELXRow;