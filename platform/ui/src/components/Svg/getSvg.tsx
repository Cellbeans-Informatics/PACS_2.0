import React from 'react';
// Svgs
import logoOhif from './../../assets/svgs/logo-ohif.svg';
import logoMm from './../../assets/svgs/logo-mm.svg';

import medimazeFull from './../../assets/svgs/Medimaze.svg';
import Rectangle from './../../assets/svgs/Rectangle.svg';
import newicon from './../../assets/svgs/newicon.svg';
import image from './../../assets/svgs/image.svg';
import pin from './../../assets/svgs/pin.svg';
import time from './../../assets/svgs/time.svg';
import MedimazeNavbar from './../../assets/svgs/MedimazeNavbar.svg';
const SVGS = {
  'logo-ohif': logoOhif,
  'logo-mm': logoMm,
  'logo-medimaze': medimazeFull,
  'logo-rectangle': Rectangle,
  'logo-newicon': newicon,
  'logo-image': image,
  'logo-pin': pin,
  'logo-time': time,
  'logo-navbar': MedimazeNavbar,
};

/**
 * Return the matching SVG as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getSvg(key, props) {
  if (!key || !SVGS[key]) {
    return React.createElement('div', null, 'Missing SVG');
  }

  return React.createElement(SVGS[key], props);
}

export { SVGS };
