import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Home from "./routes/home";
import Movies from "./routes/movies";
import Confirmation from "./routes/confirm";

const ClientRouter = () => (
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/confirm/:token" component={Confirmation} />
        <Route exact path="/movies" component={Movies} />
    </BrowserRouter>
)

export default ClientRouter;