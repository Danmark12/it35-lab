import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
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
          background: 'linear-gradient(135deg, rgb(2, 54, 60) 0%, rgb(0, 131, 151) 100%)',
          position: 'relative',
        }}
      >
        {/* DanDev Title */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}>
          <span style={{ color: '#4da6ff' }}>Dan</span>
          <span style={{ color: '#1a1a1a' }}>Dev</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <IonAvatar
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <img
              src="https://i.pinimg.com/474x/da/20/48/da2048cf7d447490ffd3aa6c62a1a29b.jpg"
              alt="App Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </IonAvatar>

          <IonCard
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            }}
          >
            <IonCardContent>

              <h1 style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                fontSize: '24px',
              }}>
                USER LOGIN
              </h1>

              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  color: '#fff',
                }}
              />

              <IonInput
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  color: '#fff',
                }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                onClick={doLogin}
                expand="full"
                shape="round"
                fill="clear"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid #ffffff50',
                  color: '#fff',
                  marginBottom: '10px',
                }}
              >
                Login
              </IonButton>

              <IonButton
                routerLink="/it35-lab/register"
                expand="full"
                fill="clear"
                shape="round"
                color="light"
              >
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
