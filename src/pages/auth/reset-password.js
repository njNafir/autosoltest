import {Component, React} from 'react';
//import { Button } from '@paljs/ui/Button';
//import { InputGroup } from '@paljs/ui/Input';
//import { Link } from 'gatsby';
import { Link } from "react-router-dom";
import { Button, Layout } from "antd";
import { SiteFooter } from '../../snippets/footer';
import { SiteHeader } from '../../snippets/header';
const {Header, Footer, Content, Sider} = Layout;

//import SEO from '../../components/SEO';
//import Auth, { Group } from '../../components/Auth';

export default function ResetPassword() {
  return (
  <div Component>
    <Header className="site-layout">
      {SiteHeader()}
    </Header>
    <Layout className="site-layout-background">
      <Sider></Sider>
      <Content>
        <form>
          <Button fullWidth>
            <input type="password" placeholder="New Password" />
          </Button>
          <Button fullWidth>
            <input type="password" placeholder="Confirm Password" />
          </Button>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Change Password
          </Button>
        </form>
        <Button>
          <Link to="/auth/login">Back to Log In</Link>
          <Link to="/auth/register">Register</Link>
        </Button>
      </Content>
      <Sider></Sider>
      </Layout>
    {SiteFooter({})}
  </div>
  );
}
