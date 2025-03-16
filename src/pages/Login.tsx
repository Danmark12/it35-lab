import { 
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent, 
  IonInput,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = () => {
    if (!email || !password) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
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
                label="Email" 
                labelPlacement="floating" 
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />

              <IonInput
                label="Password"
                labelPlacement="floating" 
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                style={{ marginTop: '10px', marginBottom: '15px' }}
              />

              <IonButton onClick={doLogin} expand="full" shape='round'>
                Login
              </IonButton>

              <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round' style={{ marginTop: '10px' }}>
                Don't have an account? Register here
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
