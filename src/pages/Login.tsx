import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonInputPasswordToggle,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';
import './Login.css';
import React from 'react';
import { useIonRouter } from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  const goToSignUp = () => {
    navigation.push('/signup', 'forward');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="login-content ion-padding">
        <div className="login-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Sign In</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="input-group">
                <IonLabel position="stacked">Username or Email</IonLabel>
                <IonInput placeholder="Enter your username or email" className="input-field" />
              </div>

              <div className="input-group">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput type="password" placeholder="Enter your password" className="input-field">
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
              </div>

              <IonButton onClick={doLogin} expand="full" className="login-button">
                Sign In
              </IonButton>

              <div className="footer">
                <span> | </span>
                <IonButton fill="clear" size="small" onClick={goToSignUp}>
                  You don't have an account? Sign up here!
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
