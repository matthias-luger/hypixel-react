import React, { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useLocation } from "react-router-dom";
import CookieConsent from 'react-cookie-consent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OfflineBanner } from '../OfflineBanner/OfflineBanner';

import { useHistory } from "react-router-dom";
import registerNotificationCallback from '../../utils/NotificationUtils';

export function MainApp(props: any) {

    const { trackPageView } = useMatomo()
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        trackPageView({
            documentTitle: document.title,
            href: window.location.href,
        });
        registerNotificationCallback(history);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <div>
            <OfflineBanner />
            {props.children}
            <CookieConsent
                enableDeclineButton
                declineButtonStyle={{ backgroundColor: "rgb(65, 65, 65)", borderRadius: "10px", color: "lightgrey", fontSize: "14px" }}
                buttonStyle={{ backgroundColor: "green", borderRadius: "10px", color: "white", fontSize: "20px" }}
                contentStyle={{ marginBottom: "0px" }}
                buttonText="Yes, I understand"
                declineButtonText="Decline"
                cookieName="nonEssentialCookiesAllowed"
            >
                <p>We use cookies to enhance the user experience.</p>
                <span> Click <a href="https://coflnet.com/privacy"> here </a> to get to our privcy policy.</span>
            </CookieConsent>
            <ToastContainer />
        </div>
    )
}