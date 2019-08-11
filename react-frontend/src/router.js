import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Home from "./routes/home";
import Movies from "./routes/movies";
import Confirmation from "./routes/confirm";
import Notify from "./routes/notify";

const ClientRouter = () => (
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/confirm/:token" component={Confirmation} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/notify" component={Notify} />
    </BrowserRouter>
)

export default ClientRouter;