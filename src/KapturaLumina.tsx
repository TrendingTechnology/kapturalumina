import { App } from "@capacitor/app";
import { AppMinimize } from "@ionic-native/app-minimize";
import {
  IonApp,
  IonSplitPane,
  setupConfig,
  useIonViewDidEnter,
} from "@ionic/react";
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

// Components / Wrappers
import {
  AuthProvider,
  LearnProvider,
  UserProfileProvider,
  UserProgressProvider,
  ThemeProvider,
} from "components/providers";
import Routing from "components/routings/Routing";
import SideMenu from "components/sidemenu/SideMenu";

// Global CSS
import "@fontsource/inter/latin.css";
import "@fontsource/karla/latin.css";
import "theme/styles/global.scss";

/* Theme variables */
import "theme/variables.scss";

App.addListener("backButton", () => {
  AppMinimize.minimize();
});

setupConfig({
  hardwareBackButton: false,
});

const KapturaLumina = () => {
  useIonViewDidEnter(() => {
    document.addEventListener(
      "backbutton",
      () => {
        return;
      },
      false
    );
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <LearnProvider>
          <UserProfileProvider>
            <UserProgressProvider>
              <IonApp>
                <IonReactRouter>
                  <IonSplitPane contentId="main">
                    <SideMenu />
                    <Routing />
                  </IonSplitPane>
                </IonReactRouter>
              </IonApp>
            </UserProgressProvider>
          </UserProfileProvider>
        </LearnProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default KapturaLumina;
