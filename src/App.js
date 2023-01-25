import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import DummyLoader from "./loaders/DummyLoader";
// import logo from './logo.svg';
import './App.css';
import DummyLoader from "./loaders/DummyLoader";
import Cookies from 'universal-cookie';

const HomePage = React.lazy(() => import("./pages/home.js"));
const ContentForIndustry = React.lazy(() => import("./pages/industry.js"));
const ContentForInterest = React.lazy(() => import("./pages/interest.js"));
const ContentDetail = React.lazy(() => import("./pages/contentDetail.js"));
const AdminPage = React.lazy(() => import("./admin/index.js"));
const LoginPage = React.lazy(() => import("./pages/auth/login.js"));
const SignupPage = React.lazy(() => import("./pages/auth/register.js"));
const AboutPage = React.lazy(() => import("./pages/about.js"));
const ContactPage = React.lazy(() => import("./pages/contact.js"));
const RequestPasswordPage = React.lazy(() => import("./pages/auth/request-password.js"));
const ResetPasswordPage = React.lazy(() => import("./pages/auth/reset-password.js"));

function App() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get('currentUser');

  useEffect(() => {

    if (cookies.get('backendProps') === undefined) {
      fetch(
        "http://127.0.0.1:8000/register/indentify-blogdi/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            domain: window.location.origin
          })
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          if (response.statusCode === 200) {
            cookies.set('backendProps', response, {path:'/'})

            fetch(response.domain + "/api/blog/meta-info/", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then((res) => res.json())
              .then((response) => {
                cookies.set('siteMetaInfo', response, {path:'/'})
                console.log(response)
              })
          }
        })
    }

  }, []);

  return (
    <div className="App">
      <Suspense fallback={<DummyLoader />}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/industry/:industry_name" component={ContentForIndustry} />
            <Route exact path="/interest/:interest_name" component={ContentForInterest} />
            <Route exact path="/:username/:slug/" component={ContentDetail} />
            <Route exact path="/admin" component={loggedInUser?AdminPage:LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/request-reset-password" component={RequestPasswordPage} />
            <Route path="/reset-password" component={ResetPasswordPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
