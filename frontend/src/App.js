import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage"
import SignupFormPage from "./components/SignupFormPage";
import SearchPage from "./components/SearchPage"
import CreateGroupPage from "./components/CreateGroupPage";
import GroupIdPage from "./components/GroupIdPage/GroupIdPage";
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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/groups" exact>
            <SearchPage />
          </Route>
          <Route path="/groups/create">
            <CreateGroupPage />
          </Route>
          <Route path="/groups/:groupId">
            <GroupIdPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
