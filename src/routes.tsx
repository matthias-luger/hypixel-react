import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import cookie from 'cookie';
import { MainApp } from './components/MainApp/MainApp';
import { getInitialLoadingElement } from './utils/LoadingUtils';

/**
 * Import all page components here
 */
const PlayerDetails = React.lazy(() => import('./pages/PlayerDetails/PlayerDetails'));
const ItemDetails = React.lazy(() => import('./pages/ItemDetails/ItemDetails'));
const AuctionDetails = React.lazy(() => import('./pages/AuctionDetails/AuctionDetails'));
const Premium = React.lazy(() => import('./pages/Premium/Premium'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const Subscriptions = React.lazy(() => import('./pages/Subscriptions/Subscriptions'));
const Feedback = React.lazy(() => import('./pages/Feedback/Feedback'));
const About = React.lazy(() => import('./pages/About/About'));
const Cancel = React.lazy(() => import('./pages/PaymentCancel/PaymentCancel'));

const matomoTrackingInstance = createInstance({
  urlBase: 'https://track.coflnet.com',
  siteId: 1,
  disabled: !isTrackingAllowed()
});

function isTrackingAllowed() {
  let cookies = cookie.parse(document.cookie);
  if (cookies.nonEssentialCookiesAllowed !== undefined) {
    return cookies.nonEssentialCookiesAllowed === "true";
  }
  return false;
}

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <MatomoProvider value={matomoTrackingInstance}>
    <Suspense fallback={getInitialLoadingElement()}>
      <MainApp>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/item/ASPECT_OF_THE_END" />} />
          <Route path='/player/:uuid' component={PlayerDetails} />
          <Route path='/item/:tag' component={ItemDetails} />
          <Route path='/auction/:auctionUUID' component={AuctionDetails} />
          <Route path='/premium' component={Premium} />
          <Route path='/about' component={About} />
          <Route path='/subscriptions' component={Subscriptions} />
          <Route path='/feedback' component={Feedback} />
          <Route path='/cancel' component={Cancel} />
          <Route path='*' exact component={NotFound} />
        </Switch>
      </MainApp>
    </Suspense>
  </MatomoProvider>
);