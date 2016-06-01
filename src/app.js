/**
 * Copyright (c) 2016, Javier Quiroz.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var RI_App = require('./components/RI_App.react');

ReactDOM.render(
  <RI_App />,
  document.getElementById('main')
);
