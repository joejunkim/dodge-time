import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage"
import SearchPage from "./components/SearchPage"
import CreateGroupPage from "./components/CreateGroupPage";
import CreateEventPage from "./components/CreateEventPage"
import GroupIdPage from "./components/GroupIdPage/GroupIdPage";
import EventIdPage from "./components/EventIdPage/EventIdPage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SplashPage />
          </Route>
          <Route path="/find" exact>
            <SearchPage />
          </Route>
          <Route path="/groups/create">
            <CreateGroupPage />
          </Route>
          <Route path="/groups/:groupId">
            <GroupIdPage />
          </Route>
          <Route path="/events/create">
            <CreateEventPage />
          </Route>
          <Route path="/events/:eventId">
            <EventIdPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
