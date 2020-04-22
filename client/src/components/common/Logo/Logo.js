import React from 'react';

const Logo = ({image, name, myStyle}) => (
    <img src={image} alt={name} className={myStyle}/>
);

export default Logo;
