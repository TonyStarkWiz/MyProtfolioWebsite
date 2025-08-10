import React from 'react';
import { Link } from 'react-scroll';
import { Navbar as Nav } from '../styles';

const Navbar = () => (
  <Nav>
    <Link to="about" smooth={true} duration={500}>About</Link>
    <Link to="experience" smooth={true} duration={500}>Experience</Link>
    <Link to="projects" smooth={true} duration={500}>Projects</Link>
  </Nav>
);

export default Navbar;
