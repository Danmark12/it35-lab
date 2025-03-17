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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Dummy login function (Replace with real API)
  const doLogin = () => {
    if (!username || !password) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 1500);
    } else {
      setAlertMessage("Invalid username or password.");
      setShowAlert(true);
    }
  };

  // Placeholder function for Google Sign-In
  const signInWithGoogle = () => {
    alert("Google login is not yet implemented.");
    // Here you can integrate Firebase or another OAuth provider
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

              <p style={{ margin: '10px 0' }}> or continue with</p>

              <IonButton onClick={signInWithGoogle} fill="clear" style={{ padding: '0', minWidth: '50px' }}>
                <img 
                  src="https://img.icons8.com/color/48/google-logo.png" 
                  alt="Google"
                  style={{ width: '30px', height: '30px' }}
                />
              </IonButton>

              <IonButton routerLink="/it35-lab/Register" expand="full" fill="clear" shape='round' style={{ marginTop: '10px' }}>
                Don't have an account? Register here!
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
