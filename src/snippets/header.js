import { useEffect, useState } from 'react';
import { Menu } from "antd";
import Cookies from 'universal-cookie';

export function SiteHeader(props) {
  const cookies = new Cookies();
  const user = cookies.get('currentUser');
  const backendProps = cookies.get('backendProps') || {'domain': null}

  const [menuProps, setMenuProps] = useState([]);

  useEffect(() => {
    if (backendProps.domain !== null){}
  }, [])

  return (
    <Menu theme="dark" mode="horizontal" style={{'textAlign': 'right'}}>
        {menuProps}
        <Menu.Item key={user?'admin':'signup'} onClick={(e) => { window.location.href = user?'/admin':'/signup' }}>
            {user?'Admin':'Signup'}
        </Menu.Item>
    </Menu>
  );
}
