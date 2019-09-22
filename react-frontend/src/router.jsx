import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Home from "./containers/home";
import Movies from "./containers/movies";
import Confirmation from "./containers/confirm";
import Notify from "./containers/notify";
import Pricing from "./containers/pricing";
import Payment from "./containers/payment";

const ClientRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/confirm/:token" component={Confirmation} />
    <Route exact path="/movies" component={Movies} />
    <Route exact path="/notify" component={Notify} />
    <Route exact path="/pricing" component={Pricing} />
    <Route exact path="/payment" component={Payment} />
  </BrowserRouter>
)

export default ClientRouter;
