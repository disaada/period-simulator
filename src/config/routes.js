import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "@pages";
import { Layout } from "@components";

const Routes = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default Routes;
