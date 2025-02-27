
import { 
  IonButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonRouter,
    IonAlert,
    IonAvatar,
    IonIcon, 
    IonToast   
} from '@ionic/react';
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonInput, IonInputPasswordToggle } from '@ionic/react'

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
      navigation.push('/it35-lab/app','forward','replace');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      

      <IonContent className='ion-padding'>

        <IonInput label="Name" placeholder="Enter company name"></IonInput>

      <IonInput type="password" label="Password" value="NeverGonnaGiveYouUp">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>
        
          <IonButton onClick={() => doLogin()} expand="full">
              Login
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
