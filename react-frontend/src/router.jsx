import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Home from "./routes/home";
import Movies from "./routes/movies";
import Confirmation from "./routes/confirm";
import Notify from "./routes/notify";
import Pricing from "./routes/pricing";
import Payment from "./routes/payment";

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
