import React from 'react';

import { Container, Sidebar, MainContent, Section, SidebarLink, SocialLinks, ExperienceSection } from './styles';

import About from './components/About';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaCodepen } from 'react-icons/fa';
import MERNIcons from './components/MERNIcons';

const Experience = () => (
  <ExperienceSection>
    <div className="experience-item">
      <div className="timeline">May 2023 - Present</div>
      <div className="details">
        <h3>Senior Android Developer | Topmate.io</h3>
        <p>
        A BLE-powered fitness tracking app that enhances real-time analytics and social engagement.
Implemented AWS IoT Core + Kinesis Data Streams for real-time fitness data streaming.
BLE synchronization for heart rate monitors, cadence sensors, and smartwatches.
Google Maps and Mapbox APIs for route tracking.
AWS IoT Core for real-time BLE device connectivity and Kinesis Data Streams for event-driven fitness analytics.
Enabling real-time tracking of workout performance with seamless BLE connectivity.
Processing and streaming fitness data through AWS for real-time insights and historical analysis.
Reduced BLE latency by 25%, improving tracking accuracy.
Increased operational efficiency by 30% through cloud optimization.
Lowered wearable battery consumption by 25% per session.
Improved user engagement by providing real-time feedback and enhanced social features.
Enabled scalable real-time fitness tracking with AWS cloud services.
        </p>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>AWS</span>
          <span>IoT Core</span>
          <span>Kinesis Data Streams</span>
          <span>Google Maps</span>
          <span>Mapbox</span>
          
          
        </div>
      </div>
    </div>
    <div className="experience-item">
      <div className="timeline">Sep 2022 - Apr 2023</div>
      <div className="details">
        <h3>Software Engineer IV - Android Engineer | Charter Communications</h3>
        <p>
        A high-performance mobile analytics SDK for tracking app usage and optimizing event data handling.
Integrated Firebase SDK + BigQuery for analytics processing and reporting.
Kotlin, Java, and Android SDK for SDK development.
Implemented Kotlin Coroutines and WorkManager for efficient background processing and task scheduling.
Firebase SDK for real-time analytics collection and BigQuery for large-scale data analysis.
Enabling real-time tracking and analytics for mobile applications.
Processing and storing analytics data using Google Cloud for scalability.
Reduced data transmission costs by 30% while maintaining real-time accuracy.
Improved background task efficiency by 40%.
Achieved a 25% performance boost by migrating from Java to Kotlin.
Ensured seamless SDK integration into various mobile applications.
Reduced SDK-related crashes by 35% through optimized data handling and debugging.
        </p>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Java</span>
          <span>Android SDK</span>
          <span>Firebase SDK</span>
          <span>Google Cloud</span>
          <span>BigQuery</span>
        </div>
      </div>
    </div>
    <div className="experience-item">
      <div className="timeline">May 2018 - Sep 2022</div>
      <div className="details">
        <h3>Senior Android Developer | EnhanceIT</h3>
        <p>
        Testimony Share: A social media app for user-generated testimonials with secure payments.
Integrated Firebase Auth + Firestore for secure authentication and data storage.
Firebase Authentication and OAuth for user login.
Google Places API for location-based testimonials.
Firestore for real-time testimonial data storage.
Increased user retention by 25% by optimizing UI/UX, leveraging Jetpack Compose (2021+), Firestore, and Cloud CDN to improve interactivity and real-time content delivery.
Reduced payment transaction errors by 30%.
Telquel Magazine App: A digital magazine platform with multimedia content and subscriptions.
Leveraged Cloud Storage + Cloud CDN for content delivery and caching.
Kotlin for refactoring Java code.
Dagger 2 (2018-2020) → Hilt (2020+) for dependency injection.
Cloud Storage for managing large multimedia content and Cloud CDN for optimized delivery.
Increased user engagement by 40%.
Reduced app crashes by 20%.
        </p>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Java</span>
          <span>Firebase Auth</span>
          <span>Firestore</span>
          <span>Google Places API</span>
          <span>Jetpack Compose</span>
        </div>
      </div>
    </div>
    <div className="experience-item">
      <div className="timeline">May 2016 - May 2018</div>
      <div className="details">
        <h3>Android Developer | EnhanceIT</h3>
        <p>
        SmartAccess Technologies: A BLE-powered smart access control solution.
Utilized AWS Cognito + Lambda for secure authentication and access management.
Dagger2 for dependency injection.
Android XML Layouts & View-based UI
AWS Cognito for user authentication and Lambda for event-driven access control.
Improved security by 50%.
Increased user satisfaction by 15%.
Tehillim: A personalized daily prayer application.
Integrated Firebase Realtime Database for synchronized user preferences.
Firebase Realtime Database for dynamic prayer content.
Implemented FragmentManager & Intent-based Navigation for UI Flow Management.
Increased engagement by 25%.
Reduced app crashes by 20%.
        </p>
        
        <div className="experience-skills">
          <span>Java</span>
          <span>AWS Cognito + Lambda</span>
          <span>Dagger2</span>
          <span>Android XML Layouts & View-based UI</span>
          <span>Firebase Realtime Database</span>
          <span>FragmentManager & Intent-based Navigation</span>
        </div>
      </div>
    </div>
  </ExperienceSection>
);

const Projects = () => (
  <ExperienceSection>
    <div className="experience-item">
    <div className="timeline">Apr 2022 - Apr 2022</div>
      <div className="details">
        <h3>CryptoLive: Real-Time Cryptocurrency Trading Data</h3>
        <p>
          CryptoLive is a cutting-edge Android application designed to display real-time trading data for all cryptocurrencies.
          Real-Time Data: Fetches live trading data for all available cryptocurrencies.
          User-Friendly Interface: Clean and intuitive UI for easy navigation.
          Push Notifications: Receive alerts for significant market changes.
          Security: Secure API integration and data encryption to protect user data.
        </p>
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Retrofit</span>
          <span>MVVM Architecture</span>
          <span>LiveData</span>
          <span>ViewModel</span>
          <span>Room Database</span>
          <span>Hilt</span>
        </div>
      </div>
    </div>
  </ExperienceSection>
);

const App = () => (
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
        <Projects />
      </Section>
    </MainContent>
  </Container>
);

export default App;