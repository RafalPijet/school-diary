import React from 'react';

const Logo = ({image, name, style}) => (
    <img src={image} alt={name} className={style}/>
);

export default Logo;
