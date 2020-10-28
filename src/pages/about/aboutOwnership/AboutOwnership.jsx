import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./AboutOwnership.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BAbout } from "../../../api/b2b.api";
import SectionList from "../../../components/SectionList";
import Tabs from "../../../components/Tabs";
import Carousel from "../../../components/Carousel";
import CuttedCarouselItem from "../../../components/CuttedCarouselItem";

const AboutOwnership = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [sections, setSections] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BAbout();

        if (response.message === "success") {
          setPages(response.data.b2b_all);
          setCurrentPage(response.data.b2b_all.find(b2b => b2b.link_url === match.url));
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.url]);

  useEffect(() => {
    if (currentPage && currentPage.sections) {
      const splittedSections = {
        nonExecutive: [],
        independent: [],
        executive: [],
        management: [],
        content: [],
      };

      for (const section of currentPage.sections) {
        if (section.slug.includes("person")) {
          if (section.slug.includes("nonexecutive")) {
            splittedSections.nonExecutive.push(section);
          } else if (section.slug.includes("independent")) {
            splittedSections.independent.push(section);
          } else if (section.slug.includes("executive")) {
            splittedSections.executive.push(section);
          } else {
            splittedSections.management.push(section);
          }
        } else {
          splittedSections.content.push(section);
        }
      }

      setSections(splittedSections);
      setActiveTab("nonExecutive");
    }
  }, [currentPage]);

  const tabs = [
    {
      id: "nonExecutive",
      value: "nonExecutive",
      label: "Non-Executive Directors",
    },
    {
      id: "independent",
      value: "independent",
      label: "Independent Non-Executive Directors",
    },
    {
      id: "executive",
      value: "executive",
      label: "Executive Directors",
    },
    {
      id: "management",
      value: "management",
      label: "Management Committee",
    },
  ];

  const handleChangeActiveTab = value => {
    setActiveTab(value);
  };

  return (
    <Layout
      pageTitle="About Ownership and Distribution"
      withBottomPadding={false}
      backButton={true}>
      {sections ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <section className={styles.main}>
            <SectionList sections={sections.content} />
          </section>
          <section className={styles.tabs}>
            <Tabs tabs={tabs} activeTab={activeTab} action={handleChangeActiveTab} />
            <h2 className={`title ${styles.tabTitle}`}>
              {tabs.find(({ value }) => value === activeTab).label}
            </h2>
          </section>
          <section className={styles.carousel}>
            <Carousel
              slides={sections[activeTab]}
              render={(slides, activeSlide) =>
                slides.map((person, index) => {
                  return (
                    <CuttedCarouselItem
                      person={person}
                      key={person.id}
                      activePost={activeSlide === index}
                    />
                  );
                })
              }
            />
          </section>
        </>
      ) : null}
    </Layout>
  );
};

export default AboutOwnership;
