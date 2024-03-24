import React from 'react';
import feedbackbg from './feedbackbg.jpg';
import { FaComments} from 'react-icons/fa'; 

const Home = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" 
         style={{ 
           backgroundImage: `linear-gradient(45deg, rgba(255, 154, 158, 0.8) 0%, rgba(250, 208, 196, 0.8) 99%, rgba(250, 208, 196, 0.8) 100%), url(${feedbackbg})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      
      {/* Welcome to Feedback Portal Section */}
      <div className="text-center py-5 px-4 mb-5">
        <h1 className="display-3 mb-4 text-primary">Welcome to Feedback Portal! <FaComments /></h1>
        <p className="lead mb-4">
          At <strong className="font-weight-bold">Feedback Portal</strong>, your opinion matters to us. 
          Whether it's a feature suggestion, a bug report, or just a general comment, 
          we want to hear from you! Please register or login to provide feedback and 
          help us improve our services.
        </p>
        <p className="mb-4">
          Not registered yet? No worries! Click on the <strong className="text-info">Register</strong> button to create an account and start sharing your feedback today.
        </p>
        <button className="btn btn-lg btn-primary shadow-sm">Get Started</button>
      </div>

     
      <div className="text-center py-5 px-4">
        <h2 className="mb-4 text-primary">How to Use Feedback Portal</h2>
        <div className="mb-4">
          <div className="d-flex justify-content-center align-items-center mb-3">
          
            <div>
              <h3 className="mb-2 text-primary">Step 1: Register/Login</h3>
              <p>Create an account or log in to start using the Feedback Portal.</p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3">
            
            <div>
              <h3 className="mb-2 text-primary">Step 2: Provide Feedback</h3>
              <p>Submit your feedback, whether it's a feature suggestion, bug report, or general comment.</p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3">
          
            <div>
              <h3 className="mb-2 text-primary">Step 3: Help Us Improve</h3>
              <p>Your feedback will help us improve our services and better serve your needs.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
