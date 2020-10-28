import React from "react";
import contactUsBannerImage from "../../static/images/contact-us-banner-image1.png";

import Layout from "../../components/Layout/Layout";
import Banner from "../../components/Banner";
import ContactUsHead from "./ContactUsHead";
import ContactUsContacts from "./ContactUsContacts";

const ContactUs = () => {
  return (
    <Layout pageTitle="Contact Us">
      <Banner title="Contact Us" backgroundImage={contactUsBannerImage} />
      <ContactUsHead />
      <ContactUsContacts />
    </Layout>
  );
};

export default ContactUs;
