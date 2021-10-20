import { Switch, Route, Redirect } from "react-router-dom";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/" exact>
          <Chat />
        </Route>
        <Route path="/404" exact>
          <Error />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default App;
