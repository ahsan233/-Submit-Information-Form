import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import styles from './SubmitForm.module.css'; 

const firebaseConfig = {
  apiKey: "AIzaSyDs-qfhJZeEgKTkGYs-QgoYmYCKCOzQtZc",
  authDomain: "reactassessment-7dd6e.firebaseapp.com",
  projectId: "reactassessment-7dd6e",
  storageBucket: "reactassessment-7dd6e.appspot.com",
  messagingSenderId: "323534971528",
  appId: "1:323534971528:web:afac1419bc7ee3ba56f53d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  dob: Yup.date().required('Date of Birth is required'),
});

const SubmitForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Add form data to Firestore database
      await db.collection('submissions').add(values);
      console.log('Form submitted successfully:', values);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const validateEmail = async (value) => {
    try {
      await Yup.string().email().validate(value);
    } catch (error) {
      return error.message;
    }
  };

  return (
    <div className={styles['form-container']}> 
      <h2>Submit Information Form</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          address: '',
          dob: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className={styles['form-group']}> {/* Apply form group style */}
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className={styles.error} /> {/* Apply error style */}
            </div>

            <div className={styles['form-group']}> {/* Apply form group style */}
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" validate={validateEmail} />
              <ErrorMessage name="email" component="div" className={styles.error} /> {/* Apply error style */}
            </div>

            <div className={styles['form-group']}> {/* Apply form group style */}
              <label htmlFor="phone">Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" className={styles.error} /> {/* Apply error style */}
            </div>

            <div className={styles['form-group']}> {/* Apply form group style */}
              <label htmlFor="address">Address</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" className={styles.error} /> {/* Apply error style */}
            </div>

            <div className={styles['form-group']}> {/* Apply form group style */}
              <label htmlFor="dob">Date of Birth</label>
              <Field type="date" name="dob" />
              <ErrorMessage name="dob" component="div" className={styles.error} /> {/* Apply error style */}
            </div>

            <button type="submit" disabled={isValidating}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubmitForm;


