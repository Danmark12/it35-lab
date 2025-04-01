import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import emailjs from 'emailjs-com';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtpEmail = async (userEmail: string, otp: string) => {
    try {
      await emailjs.send(
        '1001D', 
        'template_8t8qppi', 
        { 
          user_email: userEmail, 
          otp: otp    
        },
        'q8dH6ZjVWODvkwtjU'        
      );
      setAlertMessage('OTP sent to your email. Please check your inbox.');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('Failed to send OTP. Please try again.');
      setShowAlert(true);
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 1500);
    } else {
      setAlertMessage('Invalid OTP. Please try again.');
      setShowAlert(true);
    }
  };

  const doLogin = async () => {
    if (!email || !password) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAlertMessage(error.message || 'Login failed. Please try again.');
        setShowAlert(true);
        return;
      }

      
      const otp = generateOTP();
      setGeneratedOtp(otp); 
      sendOtpEmail(email, otp);
      setShowOtpInput(true);
    } catch (err) {
      setAlertMessage('Something went wrong. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <IonCard
            style={{
              width: '90%',
              maxWidth: '400px',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <IonCardContent>
              <h1>DanDev</h1>

              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />

              <IonInput
                label="Password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                style={{ marginTop: '10px', marginBottom: '15px' }}
              />

              <IonButton onClick={doLogin} expand="full" shape="round">
                Login
              </IonButton>

              {showOtpInput && (
                <div>
                  <IonInput
                    label="Enter OTP"
                    labelPlacement="floating"
                    fill="outline"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onIonChange={(e) => setOtp(e.detail.value!)}
                    style={{ marginTop: '15px', marginBottom: '15px' }}
                  />
                  <IonButton onClick={verifyOtp} expand="full" shape="round">
                    Verify OTP
                  </IonButton>
                </div>
              )}

              <IonButton
                routerLink="/it35-lab/register"
                expand="full"
                fill="clear"
                shape="round"
                style={{ marginTop: '10px' }}
              >
                Don't have an account? Register here!
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
