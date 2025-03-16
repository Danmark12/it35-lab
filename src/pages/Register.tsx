import { 
    IonBackButton,
    IonButtons,
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonCard, 
    IonCardContent,
    IonCardHeader, 
    IonCardTitle,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonCardSubtitle
  } from '@ionic/react';
  import React, { useState } from 'react';
  
  const Register: React.FC = () => {
    const [password, setPassword] = useState('');
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Sign Up</IonCardTitle>
              <IonCardSubtitle>Enter your details to create an account</IonCardSubtitle>
            </IonCardHeader>
  
            <IonCardContent>


              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                fill="outline"
                placeholder="Enter your password"
                style={{ marginBottom: '15px' }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
  

              <IonButton expand="full" shape="round" style={{ marginTop: '20px' }}>
                Register
              </IonButton>
  

              <IonButton
                routerLink="/it35-lab/login" 
                expand="full"
                fill="clear"
                shape="round"
                style={{ marginTop: '10px' }}
              >
                Already have an account? Log in
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  