import React, {Fragment} from 'react';
import spinner from '../../img/Spinner.gif';

export default () => (
  <Fragment>
    <img scr={spinner} alt='Loading...' style={{ width: "200px", margin: "auto", display: "block" }} />
  </Fragment>
)