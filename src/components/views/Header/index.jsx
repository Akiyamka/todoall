import React from 'react';
import Logo from '../Logo';
import TotalTime from '../../controls/TotalTime';
import style from  './style.styl';

const Header = () => (
  <div id={style.header}>
    <Logo />
    <TotalTime />
  </div>
);

export default Header;
