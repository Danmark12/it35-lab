import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
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
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(6px)',
          background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20%',
        }}>
          <IonAvatar
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <img
              src="https://i.pinimg.com/236x/0f/b3/43/0fb3435486d013161765f3a8b2f691ea.jpg"
              alt="App Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </IonAvatar>

          <h1 style={{
            fontWeight: 'bold',
            color: '#37474F',
            marginBottom: '20px',
          }}>USER LOGIN</h1>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              marginBottom: '12px',
            }}
          />
          <IonInput
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              marginBottom: '20px',
            }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton onClick={doLogin} expand="full" shape="round" color="success">
            Login
          </IonButton>

          <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape="round" color="medium">
            Don't have an account? Register here
          </IonButton>
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
