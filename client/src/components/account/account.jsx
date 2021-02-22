import React from 'react';
import {Link} from 'react-router-dom';

const Account = () => {
  return (
    <div className="account">
      <Link to='/' style={{textDecoration: 'none', fontSize: '60px'}}>
        <span>&#8592;</span>
      </Link>
    </div>
  );
};

export default Account;
