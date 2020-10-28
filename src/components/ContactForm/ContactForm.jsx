import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import didYouMean from "didyoumean";

import styles from "./ContactForm.module.scss";

import FormikTextInput from "../inputs/formikInputs/FormikTextInput";
import Checkbox from "../inputs/Checkbox";
import FormikTextarea from "../inputs/formikInputs/FormikTextarea";
import Select from "../inputs/Select";
import Button from "../buttons/Button";
import contactSchema from "./ContactFormValidation";
import { sendMessage, getQueryTypes } from "../../api/contacts.api";

const initialValues = () => ({
  name: "",
  email: "",
  telephone: "",
  department: "",
  message: "",
  agreeCommunication: false,
});

const list = [
  "@gmail.com",
  "@outlook.com",
  "@aol.com",
  "@yahoo.com",
  "@mail.ru",
  "@icloud.com",
  "@mail.com",
  "@zoho.com",
  "@yandex.ru",
];

const ContactForm = props => {
  const [domain, setDomain] = useState("");
  const [queryTypes, setQueryTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getQueryTypes();

        if (response.message === "success") {
          setQueryTypes(response.data.query_types);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getStringBeforeDomain = input => {
    const domainIndex = input.indexOf("@");
    if (domainIndex !== -1) {
      return input.substring(0, domainIndex);
    } else {
      return "";
    }
  };

  const validateEmailDomain = value => {
    const domainIndex = value.indexOf("@");
    let currentDomain;
    if (domainIndex !== -1) {
      currentDomain = value && value.slice(domainIndex);
      if (currentDomain !== didYouMean(currentDomain, list)) {
        setDomain(didYouMean(currentDomain, list));
      } else {
        setDomain("");
      }
    }
    props.setFieldValue("email", value);
  };

  const onSubmit = async event => {
    event.preventDefault();

    const { name, email, message, department, telephone, agreeCommunication } = props.values;

    try {
      await sendMessage({
        name,
        email,
        message,
        query_type: department,
        mobile: telephone,
        agree_to_comms: agreeCommunication,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const queryTypesOptions = queryTypes.map(({ id, title, slug, ...args }) => ({
    value: slug,
    label: title,
    title,
    ...args,
  }));

  return (
    <form className={styles.wrapper}>
      <div className={styles["text-input"]}>
        <FormikTextInput name="name" placeholder="Name*" formik={props} />

        <div className={styles["email-field-wrapper"]}>
          <FormikTextInput
            name="email"
            placeholder="Email address*"
            onChange={e => validateEmailDomain(e.target.value)}
            formik={props}
          />
          {domain ? (
            <div
              className={styles["did-you-mean"]}
              onClick={() => {
                props.setFieldValue(
                  "email",
                  `${getStringBeforeDomain(props.values.email)}${domain}`
                );
                setDomain("");
              }}>
              Did you mean {getStringBeforeDomain(props.values.email)}
              {domain}?
            </div>
          ) : (
            ""
          )}
        </div>

        <Select
          name="department"
          placeholder="Nature of query"
          options={queryTypesOptions}
          isSearchable={true}
          value={queryTypesOptions.find(type => type.value === props.values.department)}
          onChange={e => props.setFieldValue("department", e.value)}
          key={props.values.department}
        />

        <FormikTextInput
          name="telephone"
          placeholder="Mobile number (optional)"
          value={props.values.telephone}
          onChange={e => props.setFieldValue("telephone", e.target.value.replace(/\s/g, ""))}
          formik={props}
        />

        <FormikTextarea name="message" placeholder="Message*" formik={props} />

        <Checkbox
          onChange={() =>
            props.setFieldValue("agreeCommunication", !props.values.agreeCommunication)
          }
          name="agreeCommunication"
          id="agreeCommunication"
          label="I agree to receiving communication from Engen pertaining to my query only."
        />
      </div>

      <div className={styles["submit-button"]}>
        <Button disabled={!props.isValid} onClick={onSubmit} text="Send message" />
      </div>
    </form>
  );
};

export default withFormik({
  validationSchema: contactSchema,
  mapPropsToValues: () => initialValues(),
  isInitialValid: false,
})(ContactForm);
