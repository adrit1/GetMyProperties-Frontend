import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserProfile.module.css";
import LabeledData from "../../components/UI/Input/LabeledData";
import ExpandStructure from "../../components/UI/Expand/ExpandStructure";
import PostedProperties from "../../components/Profile/PostedProperties/PostedProperties";
import { setUser } from "../../store/profileActions";
import Modal from "../../components/UI/Modal/Modal";
import AnimatedInput from "../../components/UI/Input/AnimatedInput";
import EditProfile from "./EditProfile";
import AnimatedButton from "../../components/UI/Button/AnimatedButton";



const UserProfile = () => {


  // refresh will not work
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.userData);
  useEffect(() => {
    console.log("Inside Use Effect")
    async function verifyTokenAndSetData() {
      console.log("Inside token verification")
      const token = localStorage.getItem('token');
      console.log("token", token)
      if (token) {
        const tokenData = await axios.get(`${process.env.REACT_APP_URI}user/verifyToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(tokenData);
        const userData = await axios.get(`${process.env.REACT_APP_URI}user/getUser/${tokenData.data.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(userData.data.data);
        console.log("In dispatch", token);
        dispatch(setUser(tokenData.data.userId, userData.data.data));
        setLoading(false);
      }

    }

    if (!user) verifyTokenAndSetData();

  }, [dispatch, user]);
  const userId = useSelector((state) => state.profile.userId);
  const token = localStorage.getItem("token");

  // console.log("User")
  // console.log(user);



  const [up_properties, setUPProperties] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const [properties, setProperties] = useState([]);
  const [hasFetched1, setHasFetched1] = useState(false);


  const [tours, setTours] = useState([]);
  const [hasFetchedTour, setHasFetchedTour] = useState(false);

  const [applyTours, setApplyTours] = useState([]);
  const [hasFetchedApplyTour, setHasFetchedApplyTour] = useState(false);


  const [contacts, setContacts] = useState([]);
  const [hasFetchedContact, setHasFetchedContact] = useState(false);

  const [applyContacts, setApplyContacts] = useState([]);
  const [hasFetchedApplyContact, setHasFetchedApplyContact] = useState(false);

  const [isDeleteConfirmDialog, setIsDeleteConfirmDialog] = useState(false);
  const fetchProperties = async () => {
    if (!hasFetched) {
      try {
        const token = localStorage.getItem("token");
        const propertyDetails = await Promise.all(
          user.posted_properties.map((propertyId) =>
            axios.get(
              `${process.env.REACT_APP_URI}userPost/get/${propertyId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );
        console.log(propertyDetails);
        setUPProperties(propertyDetails.map((res) => res.data));
        setHasFetched(true); // Set hasFetched to true after fetching data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
  };

  const fetchActiveProperties = async () => {
    if (!hasFetched1) {
      try {
        const token = localStorage.getItem("token");
        const propertyDetails = await Promise.all(
          user.active_properties.map((propertyId) =>
            axios.get(
              `${process.env.REACT_APP_URI}properties/${propertyId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );
        // console.log(propertyDetails);

        setProperties(propertyDetails.map((res) => res.data));
        setHasFetched1(true);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
  };

  const fetchTourRequests = async (isApply) => {
    if (!hasFetchedTour || !hasFetchedApplyTour) {
      try {
        const token = localStorage.getItem("token");

        let reqArray = "tour_request";
        if (isApply) {
          reqArray = "tour_apply";
        }
        const tourRequests = await Promise.all(
          user[reqArray].map((tourId) =>
            axios.get(
              `${process.env.REACT_APP_URI}tours/${tourId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );
        // console.log(tourRequests);
        if (isApply) {
          setApplyTours(tourRequests.map((res) => res.data));
          setHasFetchedApplyTour(true);
        }
        else {
          setTours(tourRequests.map((res) => res.data));
          setHasFetchedTour(true);
        }

      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
  };

  const fetchContactRequests = async (isApply) => {
    if (!hasFetchedContact || !hasFetchedApplyContact) {
      try {
        const token = localStorage.getItem("token");

        let reqArray = "contact_request";
        if (isApply) {
          reqArray = "contact_apply";
        }
        const contactRequests = await Promise.all(
          user[reqArray].map((contactId) =>
            axios.get(
              `${process.env.REACT_APP_URI}contacts/${contactId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );
        // console.log(contactRequests);
        if (isApply) {
          setApplyContacts(contactRequests.map((res) => res.data));
          setHasFetchedApplyContact(true);
        }
        else {
          setContacts(contactRequests.map((res) => res.data));
          setHasFetchedContact(true);
        }

      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Function to handle file selection
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const onClickImgUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_URI}user/upload-profile-image/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`File uploaded successfully: ${data}`);
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };
  const onclickImgEdit = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_URI}user/update-profile-image/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`File updated successfully: ${data}`);
      } else {
        setUploadStatus('File update failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  }
  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URI}user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    } catch (err) {

    }
  }


  if (loading && !user) {
    return <p>Loading....</p>
  }
  return (
    <>
      {user ? <div className={styles.container}>
        <h1 className={styles.topHeading}>Profile</h1>
        <div className={styles.topContainer}>
          <div className={styles.left}>
            <img
              src={user.profile_pic}
              alt="User Profile"
              className={styles.img}
            />
            <button onClick={onclickImgEdit}>Edit</button>
            <input type="file" accept="image/*" onChange={onFileChange} />
            <button onClick={onClickImgUpload}>Upload</button>
            <p>{uploadStatus}</p>

          </div>
          <div className={styles.right}>
            <h3 className={styles.rightHeading}>User Details</h3>
            <LabeledData label="Name" data={user.user_name} />
            <LabeledData label="Mobile Number" data={user.mobile_number} />
            <LabeledData label="Email Id" data={user.email_id} />
            <LabeledData label="Gender" data={user.gender} />
            <button onClick={handleOpenModal}>Edit</button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <EditProfile data={user} />
            </Modal>

          </div>

        </div>

        <div className={styles.bottomContainer}>
          <h3 className={styles.bottomHeading}>Other Details</h3>
          <ExpandStructure title="Posted Properties" onExpand={fetchProperties}>
            <PostedProperties data={up_properties} />
          </ExpandStructure>
          <ExpandStructure title="Active Properties" onExpand={fetchActiveProperties}>
            {properties.length > 0 && properties.map((data, idx) => <div key={idx}>
              {console.log(data)}
              <p>{data.description}</p>
              <p>{data.Location}</p>
            </div>)}
          </ExpandStructure>
          <ExpandStructure title="Tour Requests" onExpand={() => fetchTourRequests(false)}>
            {tours.length > 0 && tours.map((tour, idx) => <div key={idx}>
              <p>{tour.message}</p>
              <p>{tour.time}</p>
              <p>{tour.property_id}</p>

            </div>)}
          </ExpandStructure>
          <ExpandStructure title="Contact Requests" onExpand={() => fetchContactRequests(false)}>
            {contacts.length > 0 && contacts.map((contact, idx) => <div key={idx}>
              <p>{contact.message}</p>
              <p>{contact.time}</p>
              <p>{contact.property_id}</p>

            </div>)}
          </ExpandStructure>

          {user.role === "broker" && <div>
            <ExpandStructure title="Tour Applied" onExpand={() => fetchTourRequests(true)}>
              {applyTours.length > 0 && applyTours.map((tour, idx) => <div key={idx}>
                <p>{tour.message}</p>
                <p>{tour.time}</p>
                <p>{tour.property_id}</p>

              </div>)}
            </ExpandStructure>
            <ExpandStructure title="Contact Applied" onExpand={() => fetchContactRequests(true)}>
              {applyContacts.length > 0 && applyContacts.map((contact, idx) => <div key={idx}>
                <p>{contact.message}</p>
                <p>{contact.time}</p>
                <p>{contact.property_id}</p>

              </div>)}
            </ExpandStructure>


          </div>}
          <AnimatedButton title="Delete Profile" onClick={() => { setIsDeleteConfirmDialog(true); console.log(isDeleteConfirmDialog) }} color="red" />
          <Modal isOpen={isDeleteConfirmDialog} onClose={() => setIsDeleteConfirmDialog(false)} >
            <h4>Are you Confirmed that you want to delete your Profile</h4>

            <div style={{ display: 'flex' }}>
              <AnimatedButton title="Delete Permanently" onClick={handleDeleteProfile} color="red" />
              <AnimatedButton title="Cancel" onClick={() => setIsDeleteConfirmDialog(false)} color="blue" />
            </div>
          </Modal>

        </div>
      </div> : <p>Please log in.</p>}
    </>
  );
};

export default UserProfile;
