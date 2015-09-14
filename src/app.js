/**
 * Copyright (c) 2015, Javier Quiroz.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var RI_App = require('./components/RI_App.react');

React.render(
  <RI_App name="javier"/>,
  document.getElementById('container')
);
