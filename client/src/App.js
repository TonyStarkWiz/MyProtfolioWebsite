import React from 'react';
import { Container, Sidebar, MainContent, Section, SidebarLink, SocialLinks, ExperienceSection } from './styles';

import About from './components/About';
import { FaLinkedin, FaGithub, FaRegLaughSquint, FaInstagram, FaTwitter, FaCodepen } from 'react-icons/fa';
// import { ReactComponent as ReplitLogo } from './assets/New_Replit_Logo.svg.svg'; // Use your SVG here
import MERNIcons from './components/MERNIcons';

// // Create a styled component for the Replit logo
// const StyledReplitLogo = styled(ReplitLogo)`
//   width: 1.5rem;
//   height: 1.5rem;
//   color: #8892b0;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #64ffda;
//   }
// `;

const Experience = () => (
  <ExperienceSection>
    {/* Senior Android Developer | Self-Employed */}
    <div className="experience-item">
      <div className="timeline">
        May 2023 - Present
      </div>
      <div className="details">
        <h3>Senior Android Developer | Self-Employed</h3>
        <p>
          IoT and BLE-Enabled Products: In my current role, I am leading the development of a suite of IoT and BLE-enabled products for a prominent client. This involves enhancing connectivity and functionality and implementing complete applications specializing in these technologies. My work on advanced features for various products, such as Beacons, Smart Locks, and Fitness Data Display, has significantly improved the application's operational efficiency and technological capabilities, achieving a 30% increase in operational efficiency and keeping them ahead in IoT advancements.
          <br /><br />
          Industrial Device Interface and Data Display: I played a crucial role in developing interfaces and real-time data display solutions for industrial devices. By leveraging my extensive knowledge in Android development, I created interfaces for industrial sensors and devices, covering a wide range of functionalities. This development has empowered industrial clients with real-time data visualization, enhancing their decision-making and process optimization capabilities.
          <br /><br />
          Mapping and Location Services Integration: I extensively integrated Google Maps and Mapbox APIs to enhance mapping and location-based features in various applications. This integration improved user experience and provided valuable geospatial data, resulting in increased user engagement and positive app reviews.
          <br /><br />
          AWS and Google Cloud Platform Integration: I have integrated cloud services, including AWS and Google Cloud Platform, to ensure scalable and reliable applications. My utilization of various AWS and Google Cloud services has enabled the development of robust applications, ensuring optimal performance and reliability for end-users.
        </p>
        <div className="experience-skills">
          <span>Java</span>
          <span>Kotlin</span>
          <span>Google Maps</span>
          <span>Mapbox</span>
          <span>AWS</span>
          <span>Google Cloud Platform</span>
        </div>
      </div>
    </div>

    {/* Software Engineer IV - Android Engineer | Charter Communications */}
    <div className="experience-item">
      <div className="timeline">
        Sep 2022 - Apr 2023
      </div>
      <div className="details">
        <h3>Software Engineer IV - Android Engineer | Charter Communications</h3>
        <p>
          Developed a Mobile Analytics SDK: In my role, I led the creation of an analytics SDK for mobile applications, focusing on gathering and analyzing user interaction and performance data. This SDK was designed to provide enhanced insights into app usage and performance, utilizing Kotlin and Java in Android Studio.
          <br /><br />
          Data Management and Event Handling: I implemented sophisticated data collection and management strategies, leveraging SQLite and Firebase for data storage. This involved handling diverse events and network connectivity, optimizing app functionality and user experience using JSON, GSON, Retrofit, and OkHttp.
          <br /><br />
          Innovative Feature Implementation: I engineered key components for tracking data usage across cellular and Wi-Fi networks, crucial for understanding user consumption patterns. This included the use of RxJava and RxAndroid for reactive programming and Android Job Scheduler and AlarmManager for efficient task scheduling.
          <br /><br />
          Modernized Project Infrastructure: I spearheaded the migration from Java to Kotlin, enhancing code conciseness, readability, and maintainability. This significantly improved SDK quality and 25% improvement in performance, facilitated by Agile Scrum and Kanban methodologies, and supported by TDD practices using JUnit, Espresso, and Mockito.
          <br /><br />
          Enhanced SDK Efficiency and Reliability: My utilization of Kotlin's advanced features, combined with solid algorithmic thinking, helped reduce programming errors and seamlessly integrate with existing Java code. This approach ensured smooth transitions and minimal development disruption, underpinned by effective version control using Git.
        </p>
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Java</span>
          <span>SQLite</span>
          <span>Firebase</span>
          <span>JSON</span>
          <span>Retrofit</span>
        </div>
      </div>
    </div>

    {/* Senior Android Developer | EnhanceIT */}
    <div className="experience-item">
      <div className="timeline">
        May 2018 - Sep 2022
      </div>
      <div className="details">
        <h3>Senior Android Developer | EnhanceIT</h3>
        <p>
          <span>Testimony Share - <a href="https://play.google.com/store/apps/details?id=com.TestimonyShare.android" target="_blank" rel="noopener noreferrer">View on Play Store</a></span>
Led the development of a testimony-sharing application with social logins, Google Places, and RESTful APIs, integrating a secure payment system using Kotlin and MVVM architecture.
Implemented social login functionality, integrated Google Places, and created secure RESTful APIs using Coroutines and Retrofit for a seamless user experience.
Utilized these codes to enable smooth and intuitive user interaction with the app, enhance functionality, and secure payment transactions.
Improved user experience by 20%, reduced payment transaction errors by 30%, and enhanced app stability through efficient bug tracking using Crashlytics.
My leadership and development efforts contributed to a 25% increase in active users and a 15% boost in positive app reviews.
          <br /><br />
          <span>Telquel Magazine App - <a href="https://play.google.com/store/apps/details?id=com.mobiblanc.telquel" target="_blank" rel="noopener noreferrer">View on Play Store</a></span>
Led the team in creating a comprehensive digital magazine app, integrating user management, multimedia features, and in-app subscriptions using MVVM architecture.
Rewrote the Java codebase using Kotlin, integrated Dagger2 for dependency injection, and used Retrofit for network communication to enhance performance and expand capabilities.
Utilized these codes to manage user subscriptions, handle multimedia content, and secure the app against potential vulnerabilities.
Achieved a 40% increase in user engagement, reduced app crashes by 20%, and improved user subscriptions by 10%.
My leadership and development efforts contributed to a 20% increase in positive feedback and significantly improved app capabilities.

        </p>
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>MVVM</span>
          <span>Google Places</span>
          <span>RESTful APIs</span>
          <span>Dagger2</span>
          <span>Retrofit</span>
        </div>
      </div>
    </div>

    {/* Android Developer | EnhanceIT */}
    <div className="experience-item">
      <div className="timeline">
        May 2016 - May 2018
      </div>
      <div className="details">
        <h3>Android Developer | EnhanceIT</h3>
        <p>
        <span>SmartAccess Technologies - <a href="https://play.google.com/store/apps/details?id=com.smartaccesstechnologies.smartaccess" target="_blank" rel="noopener noreferrer">View on Play Store</a></span>
Led the development of an innovative access control solution with secure login and smart access controls using Hilt for dependency injection.
Implemented secure login functionality, integrated Hilt for efficient dependency management, and utilized Jetpack Compose for UI development, enhancing security and usability.
Utilized these codes to improve access control efficiency, provide a user-friendly interface, and ensure secure authentication.
Enhanced security by 50%, improved user satisfaction by 15%, and reduced access-related issues by 40%.
My leadership and technical contributions resulted in a 30% increase in user adoption and a 10% increase in customer retention.

          <br /><br />
          <span>Tehillim - <a href="https://play.google.com/store/apps/details?id=com.sollyfaks.tehillim" target="_blank" rel="noopener noreferrer">View on Play Store</a></span>
Led the team in developing an app for daily prayer recitations with advanced personalization and intuitive UI using Jetpack Compose.
Implemented personalized features, utilized Jetpack Navigation for seamless navigation, and integrated Glide for image loading to create a user-friendly and reliable application.
Utilized these codes to enhance user engagement, facilitate personalization, and improve overall app performance.
Achieved a 25% increase in user engagement, improved personalization by 30%, and reduced app crashes by 20%.
My efforts led to a 20% increase in daily active users and a 15% improvement in overall user satisfaction.

        </p>
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Jetpack Compose</span>
          <span>Hilt</span>
          <span>Google Places</span>
          <span>Glide</span>
          <span>Jetpack Navigation</span>
        </div>
      </div>
    </div>
  </ExperienceSection>
);

// Renamed the Projects component to avoid the conflict
const NewProjects = () => (
  <ExperienceSection>
    {/* CryptoLive: Real-Time Cryptocurrency Trading Data */}
    <div className="experience-item">
      <div className="timeline">
        {/* You can leave this empty or add a date range if applicable */}
      </div>
      <div className="details">
        <h3>CryptoLive: Real-Time Cryptocurrency Trading Data</h3>
        <p>
          CryptoLive is a cutting-edge Android application designed to display real-time trading data for all cryptocurrencies. Leveraging the latest APIs and technology stacks, this app provides users with up-to-the-minute market information, enabling them to track prices, trends, and trading volumes across various exchanges seamlessly.
          <br /><br />
          <strong>Key Features:</strong>
          <br />
          Real-Time Data: Fetches live trading data for all available cryptocurrencies, including price, volume, and market cap.
          <br />
          User-Friendly Interface: Clean and intuitive UI for easy navigation and a better user experience.
          <br />
          Customizable Watchlists: Allows users to create and manage their favorite cryptocurrency watchlists.
          <br />
          Detailed Charts: Displays comprehensive charts and graphs to visualize historical price data and market trends.
          <br />
          Push Notifications: Receive alerts for significant market changes or specific price thresholds.
          <br />
          Offline Mode: View previously fetched data when offline, with automatic updates when reconnected.
          <br />
          Security: Secure API integration and data encryption to protect user data and trading information.
        </p>
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Retrofit</span>
          <span>MVVM Architecture</span>
          <span>LiveData</span>
          <span>ViewModel</span>
          <span>Room Database</span>
          <span>Dagger2</span>
          <span>Hilt</span>
        </div>
      </div>
    </div>
  </ExperienceSection>
);

const App = () => (
  <div>
    <Container>
      <Sidebar>
        <div>
          <h1>Anthony Espinoza</h1>
          <h2>Senior Software Engineer</h2>
          <p>Mobile & Web Development Expert | AI & Quantum Computing Enthusiast</p>
          <SidebarLink href="#about">About</SidebarLink>
          <SidebarLink href="#experience">Professional Experience</SidebarLink>
          <SidebarLink href="#projects">Projects</SidebarLink>
          <SocialLinks>
            <a href="https://github.com/TonyStarkWiz" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/anthony-espinoza-engineer/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            {/* <a href="https://replit.com/@AnthonyX3" target="_blank" rel="noopener noreferrer">
              <StyledReplitLogo />
            </a> */}
            <a href="https://www.instagram.com/anthonyespinosa8/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com/EarthsTonyStark" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://codepen.io/tony_starkucf" target="_blank" rel="noopener noreferrer"><FaCodepen /></a>
          </SocialLinks>
        </div>
        <MERNIcons />
      </Sidebar>
      <MainContent>
        <Section id="about">
          <About />
        </Section>
        <Section id="experience">
          <Experience />
        </Section>
        <Section id="projects">
          <NewProjects /> {/* Use the new name for the Projects component */}
        </Section>
      </MainContent>
    </Container>
  </div>
);

export default App;
