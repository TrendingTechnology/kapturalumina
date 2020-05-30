import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
  IonText,
  IonChip,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { UserData } from "../models/users";
import { usersData } from "../firebase/users";
import { leaderboard } from "../firebase/leaderboard";
import { logoInstagram, logoYoutube, globeOutline } from "ionicons/icons";

export default function UserProfile(props: any) {
  const [user, setUser] = useState<UserData>();
  const [busy, setBusy] = useState<boolean>(true);
  const [userPoint, setPoints] = useState<number>(0);

  useEffect(() => {
    const user_id = props.match.params.userId;
    usersData.on("value", (snap) => {
      snap.forEach((entry) => {
        if (entry.val().public_id === user_id) {
          setUser(entry.val());
        }
      });
    });
    leaderboard.on("value", (snap) => {
      snap.forEach((entry) => {
        if (entry.val().public_id === user_id) {
          setPoints(entry.val().points);
        }
      });
    });
    setBusy(false);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow class="ion-padding-vertical">
            <IonCol size="3" style={{ position: "relative" }}>
              <IonAvatar
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <IonImg
                  src={"https://api.adorable.io/avatars/200/" + user?.name}
                />
              </IonAvatar>
            </IonCol>
            <IonCol size="9">
              <IonText>
                <h4>{user?.name}</h4>
                <p>{user?.bio} </p>
              </IonText>
              {/* <IonText>
                    <p>Email : {user?.email}</p>
                  </IonText> */}
            </IonCol>
          </IonRow>
          <IonRow class="socialMediaLinks">
            {user?.socialLinks?.instagram ? (
              <a
                href={
                  "http://www.instagram.com/" + user?.socialLinks?.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <IonChip color="insta">
                  <IonIcon icon={logoInstagram} />
                  <IonLabel>Instagram</IonLabel>
                </IonChip>
              </a>
            ) : null}

            {user?.socialLinks?.youtube ? (
              <a
                href={"https://youtube.com/" + user?.socialLinks?.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IonChip color="youtube">
                  <IonIcon icon={logoYoutube} />
                  <IonLabel>YouTube</IonLabel>
                </IonChip>
              </a>
            ) : null}

            {user?.socialLinks?.website ? (
              <a
                href={user?.socialLinks?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IonChip color="darkcream">
                  <IonIcon icon={globeOutline} />
                  <IonLabel>Website</IonLabel>
                </IonChip>
              </a>
            ) : null}
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonText>
                <h3>{userPoint}</h3>
                <p>Poin</p>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>
                <h3>{user?.achievements ? user.achievements.length : 0}</h3>
                <p>Pencapaian</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
