import React, { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonText,
  IonModal,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

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

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error("Account creation failed: " + error.message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from("users").insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword,
        },
      ]);

      if (insertError) {
        throw new Error("Failed to save user data: " + insertError.message);
      }

      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
      } else {
        setAlertMessage("An unknown error occurred.");
      }
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(6px)',
          background: 'linear-gradient(135deg, rgb(2, 54, 60) 0%, rgb(0, 131, 151) 100%)',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* DanDev Logo */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: '#4ea8de' }}>Dan</span><span style={{ color: '#1a1a1a' }}>Dev</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <IonCard
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              color: 'white'
            }}
          >
            <IonCardContent>

              {/* Title Inside the Card */}
              <IonTitle style={{ textAlign: 'center', marginBottom: '20px' }}>
                User Register
              </IonTitle>

              <IonInput
                label="Username"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter username"
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />
              <IonInput
                label="First Name"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onIonChange={e => setFirstName(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />
              <IonInput
                label="Last Name"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onIonChange={e => setLastName(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />
              <IonInput
                label="Email"
                labelPlacement="stacked"
                fill="outline"
                type="email"
                placeholder="youremail@nbsc.edu.ph"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />
              <IonInput
                label="Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Enter password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput
                label="Confirm Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onIonChange={e => setConfirmPassword(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                expand="full"
                fill="clear"
                shape="round"
                onClick={handleOpenVerificationModal}
                style={{ color: 'white', border: '1px solid white', marginBottom: '10px' }}
              >
                Register
              </IonButton>

              <IonButton
                expand="full"
                fill="clear"
                shape="round"
                routerLink="/it35-lab"
                style={{ color: 'black' }}
              >
                Already have an account? Sign in
              </IonButton>

            </IonCardContent>
          </IonCard>
        </div>

        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%', color: 'black' }}>
              <IonCardContent>
                <IonTitle>User Registration Details</IonTitle>
                <IonText>
                  <p><strong>Username:</strong> {username}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Name:</strong> {firstName} {lastName}</p>
                </IonText>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                  <IonButton onClick={doRegister}>Confirm</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center', color: 'black' }}>
            <IonTitle>Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" routerDirection="back">
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
