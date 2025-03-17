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
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonAlert
} from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setAlertMessage("All fields are required!");
      setShowAlert(true);
      return;
    }
    
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setShowAlert(true);
      return;
    }

    console.log("Registering user", { username, password });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <IonCard style={{ width: '90%', maxWidth: '400px', textAlign: 'center', padding: '20px' }}>
            <IonCardContent>
              <h1>DanDev</h1>

              <IonInput
                label="Username" 
                labelPlacement="floating" 
                fill="outline"
                type="text"
                placeholder="Enter Username"
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />

              <IonInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                labelPlacement="floating" 
                fill="outline"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                placeholder="Enter Password"
                style={{ marginTop: '10px', marginBottom: '15px' }}
              />

              <IonInput
                type={showPassword ? 'text' : 'password'}
                label="Confirm Password"
                labelPlacement="floating" 
                fill="outline"
                value={confirmPassword}
                onIonChange={e => setConfirmPassword(e.detail.value!)}
                placeholder="Confirm Password"
                style={{ marginBottom: '15px' }}
              />

              <IonButton expand="full" shape="round" style={{ marginTop: '20px' }} onClick={handleRegister}>
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
        </div>
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Notification"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;