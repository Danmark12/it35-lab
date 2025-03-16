import { 
  IonBackButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonCard, 
    IonCardContent,
     IonCardHeader, 
    IonCardSubtitle,
     IonCardTitle,
} from '@ionic/react';
import React from 'react';

const Register: React.FC = () => {
  return (
    <IonPage>
     
      <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
    </IonCard>

    </IonPage>
  );
};

export default Register;