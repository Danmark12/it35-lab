import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async () => {
    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      setAlertMessage('All fields are required!');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match!');
      setShowAlert(true);
      return;
    }

    // Validate email domain
    if (!email.endsWith('@gmail.com')) {
      setAlertMessage('Only @gmail.com emails are allowed to register.');
      setShowAlert(true);
      return;
    }

    // Open verification modal
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    try {
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert the user into the 'users' table
      const { data, error } = await supabase.from('users').insert([
        {
          username,
          email,
          password: hashedPassword,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setAlertMessage('Registration failed. Please try again.');
        setShowAlert(true);
        return;
      }

      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage('An error occurred during registration.');
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
                label="Username"
                labelPlacement="floating"
                fill="outline"
                type="text"
                placeholder="Enter Username"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />

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
                style={{ marginBottom: '15px' }}
              />

              <IonInput
                label="Confirm Password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />

              <IonButton
                expand="full"
                shape="round"
                style={{ marginTop: '20px' }}
                onClick={handleRegister}
              >
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

        {/* Verification Modal */}
        <IonAlert
          isOpen={showVerificationModal}
          onDidDismiss={() => setShowVerificationModal(false)}
          header="Confirm Registration"
          message={`Are you sure you want to register with the following details? 
                    \n\nUsername: ${username}\nEmail: ${email}`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowVerificationModal(false),
            },
            {
              text: 'Confirm',
              handler: doRegister,
            },
          ]}
        />

        {/* Success Modal */}
        <IonAlert
          isOpen={showSuccessModal}
          onDidDismiss={() => setShowSuccessModal(false)}
          header="Registration Successful"
          message="Your account has been created successfully!"
          buttons={[
            {
              text: 'OK',
              handler: () => setShowSuccessModal(false),
            },
          ]}
        />

        {/* Alert Box */}
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
