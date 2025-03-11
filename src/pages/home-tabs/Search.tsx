import { 
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  import React from 'react';
import { IonSearchbar } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';

  const Search: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>

            <>
      <IonSearchbar></IonSearchbar>
    </>

            </IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent fullscreen>

          makoy
        </IonContent>

        
      </IonPage>
    );
  };
  
  export default Search;