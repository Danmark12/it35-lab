import {
    IonAlert,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToast,
    IonToolbar,
    useIonRouter
} from '@ionic/react';
import {
    homeOutline,
    logOutOutline,
    rocketOutline,
    settingsOutline
} from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Home from './Home';
import About from './About';
import Details from './Details';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';
import EditProfile from './EditProfile';

const Menu: React.FC = () => {
    const navigation = useIonRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const path = [
        {
            name: 'Home',
            url: '/it35-lab/app/home',
            icon: homeOutline,
            color: '#42a5f5' // Blue
        },
        {
            name: 'About',
            url: '/it35-lab/app/about',
            icon: rocketOutline,
            color: '#ab47bc' // Purple
        },
        {
            name: 'Profile',
            url: '/it35-lab/app/profile',
            icon: settingsOutline,
            color: '#26a69a' // Teal
        }
    ];

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setShowToast(true);
            setTimeout(() => {
                navigation.push('/it35-lab', 'back', 'replace');
            }, 300);
        } else {
            setErrorMessage(error.message);
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonSplitPane contentId="main">
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent
                        className="ion-padding"
                        style={{
                            '--background': 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(6px)',
                            background: 'linear-gradient(135deg, rgb(2, 54, 60) 0%, rgb(0, 131, 151) 100%)',
                            position: 'relative',
                            height: '100%',
                        }}
                    >
                        {path.map((item, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    routerLink={item.url}
                                    routerDirection="forward"
                                    lines="none"
                                    style={{
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        backgroundColor: item.color,
                                        color: 'white'
                                    }}
                                >
                                    <IonIcon icon={item.icon} slot="start" style={{ color: 'white' }} />
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}

                        {/* Logout Button at Bottom */}
                        <div style={{ position: 'absolute', bottom: '20px', width: '85%' }}>
                            <IonButton
                                expand="full"
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#66BB6A',
                                    border: '1px solid rgb(76, 158, 191)',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    padding: '12px 20px'
                                }}
                            >
                                <IonIcon icon={logOutOutline} slot="start" />
                                Logout
                            </IonButton>
                        </div>
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id="main">
                    <Route exact path="/it35-lab/app/home" component={Home} />
                    <Route exact path="/it35-lab/app/home/details" component={Details} />
                    <Route exact path="/it35-lab/app/about" component={About} />
                    <Route exact path="/it35-lab/app/profile" component={EditProfile} />
                    <Route exact path="/it35-lab/app">
                        <Redirect to="/it35-lab/app/home" />
                    </Route>
                </IonRouterOutlet>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Logout Failed"
                    message={errorMessage}
                    buttons={['OK']}
                />

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Logout Successful"
                    duration={1500}
                    position="top"
                    color="primary"
                />
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;
