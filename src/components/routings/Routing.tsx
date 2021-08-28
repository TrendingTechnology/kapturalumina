import { IonRouterOutlet } from "@ionic/react";
import { useContext } from "react";
import { Route, Redirect } from "react-router";

import AboutPage from "pages/AboutPage";
import LoginPage from "pages/auth/LoginPage";
import RegisterPage from "pages/auth/RegisterPage";
import ChapterPage from "pages/main/learn/ChapterPage";
import QuizPage from "pages/main/learn/QuizPage";
import SubModulePage from "pages/main/learn/SubModulePage";
import MainTabs from "pages/main/MainTabs";
import EditProfile from "pages/main/profile/EditProfile";
import UserProfile from "pages/main/profile/UserProfile";
import PublicHome from "pages/PublicPage";

import { AuthContext } from "../providers";

import PrivateRoute from "./PrivateRoute";

const Routing = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <IonRouterOutlet id="main">
      <Route component={PublicHome} />
      <PrivateRoute path="/main" component={MainTabs} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <PrivateRoute exact path="/learn/:chapterId" component={ChapterPage} />
      <PrivateRoute
        exact
        path="/learn/:chapterId/:subModuleId"
        component={SubModulePage}
      />
      <PrivateRoute
        exact
        path="/quiz/:chapterId/:subModuleId"
        component={QuizPage}
      />

      <PrivateRoute exact path="/editprofile" component={EditProfile} />
      <PrivateRoute exact path="/user/:userId" component={UserProfile} />
      <Route path="/about" component={AboutPage} />
      <Route path="/home" component={PublicHome} />
      {currentUser ? (
        <Route exact path="/" render={() => <Redirect to="/main" />} />
      ) : (
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      )}
    </IonRouterOutlet>
  );
};

export default Routing;
