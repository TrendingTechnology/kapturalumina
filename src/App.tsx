import React, { useEffect, useState } from "react";
import { IonApp, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Components / Wrappers
import SideMenu from "./components/SideMenu";
import Routing from "./components/Routing";

// Redux
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import { createStore } from "redux";
import AuthProvider from "./components/AuthProvider";
import LearnProvider from "./components/LearnProvider";

const store = createStore(reducer);

const App: React.FC = () => {
  return (
    // <Provider store={store}>
    <AuthProvider>
      <LearnProvider>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <SideMenu />
              <Routing />
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </LearnProvider>
    </AuthProvider>
    // </Provider>
  );
};

export default App;
