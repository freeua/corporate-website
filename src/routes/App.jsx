import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ---- Pages
import Homepage from "../pages/homepage";
import ContactUs from "../pages/contact-us";
import Products from "../pages/products/Products";
import ProductView from "../pages/products/ProductView";
import ServiceStationLocator from "../pages/service-station-locator/";
import Industrial from "../pages/industrial";
import IndustrialView from "../pages/industrial/IndustrialView";
import MediaRoom from "../pages/media-room/";
import MediaReleases from "../pages/media-room/MediaReleases";
import MediaReleasesView from "../pages/media-room/MediaReleasesView";
import MediaAds from "../pages/media-room/MediaAds";
import AboutValue from "../pages/about/aboutValue/AboutValue";
import AboutSupply from "../pages/about/aboutSupply/AboutSupply";
import AboutOwnership from "../pages/about/aboutOwnership/AboutOwnership";
import About from "../pages/about/About";
import { NearestStationContextProvider } from "../components/StationSearch/StationSearch";
import { NearestOfficeContextProvider } from "../components/NearestStation/NearestStation";
import MediaReports from "../pages/media-room/MediaReports";
// import MediaPerformance from "../pages/media-room/MediaPerformance";
import Promotions from "../pages/promotions";
import PromotionView from "../pages/promotions/PromotionsView";
import Lubricants from "../pages/lubricants/";
import LubricantDisposal from "../pages/lubricants/LubricantDisposal";
import LubricantService from "../pages/lubricants/LubricantService";
import Fuels from "../pages/fuels";
import FuelDynamic from "../pages/fuels/fuelDynamic";
import FuelPrimax from "../pages/fuels/fuelPrimax";
import Motorists from "../pages/motorists";
import MotoristsFranchising from "../pages/motorists/motoristsFranchising";
import MotoristsAdblue from "../pages/motorists/motoristsAdblue";
import EngenCares from "../pages/engen-cares/EngenCares";
import EngenCaresCsi from "../pages/engen-cares/EngenCaresCsi";
import EngenCaresHseq from "../pages/engen-cares/EngenCaresHseq";
import EngenCaresSponsorship from "../pages/engen-cares/EngenCaresSponsorship";
import EngenCaresSustainability from "../pages/engen-cares/EngenCaresSustainability";
import EngenCaresTransformation from "../pages/engen-cares/EngenCaresTransformation";
import Faq from "../pages/faq";
import FaqEngenPrimax from "../pages/faq/FaqEngenPrimax";
import FaqEngenDynamic from "../pages/faq/FaqEngenDynamic";
import FaqAdBlue from "../pages/faq/FaqAdBlue";
import LubricantProducts from "../pages/lubricants/LubricantProducts/LubricantProducts";
import Search from "../pages/search";
import LubricantRecommender from "../pages/lubricants/LubricantRecommender";
import MotoristsConvenience from "../pages/motorists/motoristsConvenience";
import MotoristsRewards from "../pages/motorists/motoristsRewards";
import ServiceView from "../pages/service";

const App = () => (
  <Router>
    <NearestStationContextProvider>
      <NearestOfficeContextProvider>
        <div className="app-wrapper">
          <Switch>
            <Route exact={true} path="/" component={Homepage} />
            <Route exact={true} path="/search" component={Search} />
            <Route exact={true} path="/contact" component={ContactUs} />
            <Route exact={true} path="/products" component={Products} />
            <Route exact={true} path="/products/:slug" component={ProductView} />
            <Route exact={true} path="/service-station-locator" component={ServiceStationLocator} />
            <Route exact={true} path="/business-solutions" component={Industrial} />
            <Route exact={true} path="/business-solutions/:slug" component={IndustrialView} />
            <Route exact={true} path="/media" component={MediaRoom} />
            <Route exact={true} path="/media/media-release" component={MediaReleases} />
            <Route exact={true} path="/media/annual-reports" component={MediaReports} />
            {/* <Route
              exact={true}
              path="/media/performance-&-sustainability"
              component={MediaPerformance}
            /> */}
            <Route exact={true} path="/media/media-release/:media" component={MediaReleasesView} />
            <Route exact={true} path="/media/annual-reports/:media" component={MediaReleasesView} />
            {/* <Route
              exact={true}
              path="/media/performance-&-sustainability/:media"
              component={MediaReleasesView}
            /> */}
            <Route exact={true} path="/media/videos" component={MediaAds} />
            <Route exact={true} path="/service-station-locator" component={ServiceStationLocator} />
            <Route exact={true} path="/promotions" component={Promotions} />
            <Route exact={true} path="/promotions/:promotion" component={PromotionView} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/about/valuesandethics" component={AboutValue} />
            <Route exact={true} path="/about/supply-and-distribution" component={AboutSupply} />
            <Route exact={true} path="/about/ownership" component={AboutOwnership} />
            <Route exact={true} path="/lubricants" component={Lubricants} />
            <Route exact={true} path="/lubricants/products" component={LubricantProducts} />
            <Route exact={true} path="/lubricants/disposal-guide" component={LubricantDisposal} />
            <Route exact={true} path="/lubricants/technical-support" component={LubricantService} />
            <Route exact={true} path="/lubricants/recommender" component={LubricantRecommender} />
            <Route exact={true} path="/our-fuels" component={Fuels} />
            <Route exact={true} path="/our-fuels/engen-dynamic-diesel" component={FuelDynamic} />
            <Route exact={true} path="/our-fuels/engen-primax-unleaded" component={FuelPrimax} />
            <Route exact={true} path="/motorists" component={Motorists} />
            <Route exact={true} path="/motorists/convenience" component={MotoristsConvenience} />
            <Route exact={true} path="/motorists/rewards" component={MotoristsRewards} />
            <Route exact={true} path="/motorists/franchising" component={MotoristsFranchising} />
            <Route exact={true} path="/motorists/adblue" component={MotoristsAdblue} />
            <Route exact={true} path="/engen-cares" component={EngenCares} />
            <Route exact={true} path="/engen-cares/csi" component={EngenCaresCsi} />
            <Route exact={true} path="/engen-cares/hseq" component={EngenCaresHseq} />
            <Route
              exact={true}
              path="/engen-cares/sponsorships"
              component={EngenCaresSponsorship}
            />
            <Route
              exact={true}
              path="/engen-cares/sustainability"
              component={EngenCaresSustainability}
            />
            <Route
              exact={true}
              path="/engen-cares/transformation"
              component={EngenCaresTransformation}
            />
            <Route exact={true} path="/faq" component={Faq} />
            <Route exact={true} path="/faq/engen-primax-unleaded" component={FaqEngenPrimax} />
            <Route exact={true} path="/faq/engen-dynamic-diesel" component={FaqEngenDynamic} />
            <Route exact={true} path="/faq/engen-adblue" component={FaqAdBlue} />
            <Route exact={true} path="/services/:slug" component={ServiceView} />
          </Switch>
        </div>
      </NearestOfficeContextProvider>
    </NearestStationContextProvider>
  </Router>
);

export default App;
