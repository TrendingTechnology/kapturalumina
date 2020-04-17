import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLoading,
} from "@ionic/react";
import { loginUser } from "../firebaseConfig";
import { presentTopToast } from "../components/Toast";
import { withRouter } from "react-router";

function LoginPage(props: any) {
  const [wait, setWait] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    setWait(true);
    const res = await loginUser(email, password);
    if (res) {
      presentTopToast("Berhasil Masuk!");
      props.history.replace('/');
    } else {
      setEmail("");
      setPassword("");
    }
    setWait(false);
  }

  return (
    <IonPage>
      {<IonLoading message="Mohon Tunggu..." duration={0} isOpen={wait} />}
      <IonContent>
        <IonHeader>
          <IonToolbar style={{ height: "20vh" }} color="tertiary">
            <IonTitle size="large">Masuk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonList>
            <IonItem>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                placeholder="E-Mail Anda"
              />
            </IonItem>
            <IonItem>
              <IonInput
                value={password}
                type="password"
                placeholder="Kata Sandi Anda"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  shape="round"
                  fill="solid"
                  color="success"
                  onClick={login}
                  type="submit"
                >
                  Masuk
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton fill="clear">Lupa Kata Sandi</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonText>Belum punya akun?</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  shape="round"
                  fill="solid"
                  color="secondary"
                  routerLink="/register"
                >
                  Daftar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(LoginPage);
