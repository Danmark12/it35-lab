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
    IonButton
  } from '@ionic/react';
  import React, { useState } from 'react';
  
  const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleRegister = () => {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      console.log("Registering user", { email, password });
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
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  labelPlacement="floating" 
                  fill="outline"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value!)}
                  placeholder="Enter Password"
                  style={{ marginTop: '10px', marginBottom: '15px' }}
                >
                </IonInput>
  
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  labelPlacement="floating" 
                  fill="outline"
                  value={confirmPassword}
                  onIonChange={e => setConfirmPassword(e.detail.value!)}
                  placeholder="Confirm Password"
                  style={{ marginBottom: '15px' }}
                >
                </IonInput>
  
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
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  