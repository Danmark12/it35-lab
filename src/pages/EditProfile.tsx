import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonInput, IonButton, IonAlert, IonHeader,
  IonBackButton, IonButtons, IonItem, IonText, IonCol, IonGrid,
  IonRow, IonInputPasswordToggle, IonImg, IonAvatar, IonCard, IonCardContent,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useHistory } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session || !session.session) {
        setAlertMessage('You must be logged in to access this page.');
        setShowAlert(true);
        history.push('/it35-lab/login');
        return;
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
        .eq('user_email', session.session.user.email)
        .single();

      if (userError || !user) {
        setAlertMessage('User data not found.');
        setShowAlert(true);
        return;
      }

      setFirstName(user.user_firstname || '');
      setLastName(user.user_lastname || '');
      setAvatarPreview(user.user_avatar_url);
      setEmail(user.user_email);
      setUsername(user.username || '');
    };

    fetchSessionAndData();
  }, [history]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      setAlertMessage("Passwords don't match.");
      setShowAlert(true);
      return;
    }

    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session || !session.session) {
      setAlertMessage('Error fetching session or no session available.');
      setShowAlert(true);
      return;
    }

    const user = session.session.user;

    if (!user.email) {
      setAlertMessage('Error: User email is missing.');
      setShowAlert(true);
      return;
    }

    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (passwordError) {
      setAlertMessage('Incorrect current password.');
      setShowAlert(true);
      return;
    }

    let avatarUrl = avatarPreview;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        setAlertMessage(`Avatar upload failed: ${uploadError.message}`);
        setShowAlert(true);
        return;
      }

      const { data } = supabase.storage.from('user-avatars').getPublicUrl(filePath);
      avatarUrl = data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        user_firstname: firstName,
        user_lastname: lastName,
        user_avatar_url: avatarUrl,
        username: username,
      })
      .eq('user_email', user.email);

    if (updateError) {
      setAlertMessage(updateError.message);
      setShowAlert(true);
      return;
    }

    if (password) {
      const { error: passwordUpdateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (passwordUpdateError) {
        setAlertMessage(passwordUpdateError.message);
        setShowAlert(true);
        return;
      }
    }

    setAlertMessage('Account updated successfully!');
    setShowAlert(true);
    history.push('/it35-lab/app');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(6px)',
          background: 'linear-gradient(135deg, rgb(2, 54, 60) 0%, rgb(0, 131, 151) 100%)',
          color: '#fff',
        }}
      >
        <style>
          {`
            ion-input, ion-text, h1, h3 {
              color: white !important;
            }

            ion-input .label-text {
              color: white !important;
            }

            .glow-button {
              transition: box-shadow 0.3s ease-in-out;
              color: white;
              border-radius: 30px;
            }

            .glow-button:active {
              box-shadow: 0 0 20px 3px rgba(255, 255, 255, 0.92);
            }
          `}
        </style>

        <IonItem lines="none">
          <IonText color="light">
            <h1>Edit Account</h1>
          </IonText>
        </IonItem>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              {avatarPreview && (
                <IonAvatar style={{ width: '200px', height: '200px', margin: '10px auto' }}>
                  <IonImg src={avatarPreview} style={{ objectFit: 'cover' }} />
                </IonAvatar>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <IonButton expand="block" fill="clear" color="light" onClick={() => fileInputRef.current?.click()}>
                Upload Avatar
              </IonButton>
            </IonCol>
          </IonRow>

          <IonCard style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
            <IonCardContent>
              <IonInput label="Username" labelPlacement="floating" fill="outline" value={username}
                onIonChange={(e) => setUsername(e.detail.value!)} />
              <IonRow>
                <IonCol>
                  <IonInput label="First Name" labelPlacement="floating" fill="outline" value={firstName}
                    onIonChange={(e) => setFirstName(e.detail.value!)} />
                </IonCol>
                <IonCol>
                  <IonInput label="Last Name" labelPlacement="floating" fill="outline" value={lastName}
                    onIonChange={(e) => setLastName(e.detail.value!)} />
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>

          <IonCard style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
            <IonCardContent>
              <IonText color="light"><h3>Change Password</h3></IonText>
              <IonInput
                label="New Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput
                label="Confirm Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonCardContent>
          </IonCard>

          <IonCard style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
            <IonCardContent>
              <IonText color="light"><h3>Confirm Changes</h3></IonText>
              <IonInput
                label="Current Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                value={currentPassword}
                onIonChange={(e) => setCurrentPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonCardContent>
          </IonCard>

          <IonButton
            expand="block"
            fill="solid"
            color="light"
            shape="round"
            className="glow-button"
            onClick={handleUpdate}>
            Update Account
          </IonButton>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
