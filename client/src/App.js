import React from 'react';

import { Container, Sidebar, MainContent, Section, SidebarLink, SocialLinks, ExperienceSection } from './styles';

import About from './components/About';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaCodepen } from 'react-icons/fa';
import MERNIcons from './components/MERNIcons';

const Experience = () => (
  <ExperienceSection>
    <div className="experience-item">
      <div className="timeline">May 2025 - Present</div>
      <div className="details">
        <h3>Senior Android Engineer | DanceLink</h3>
        <p>
          Built a high-converting Android app for dance event discovery and partner matching using MVVM, Compose, and Firebase. Achieved 50% better onboarding conversion and cut Firebase costs 65% with offline caching, WorkManager syncing, and Meta-style infra strategies.
        </p>
        <ul>
          <li>Built a high-converting Android app from scratch (MVVM, Jetpack Compose, Hilt).</li>
          <li>Designed Glassmorphism UI, real-time events, and partner-match flows for engagement.</li>
          <li>Integrated Firebase (Firestore, Remote Config, Auth) with offline caching and hourly sync.</li>
          <li>Achieved 50% improvement in onboarding-to-booking conversions using DataStore and location-aware flows.</li>
          <li>Cut Firebase costs 65% using Instagram-style caching strategies (e.g., fetch boundaries, write batching).</li>
        </ul>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>MVVM</span>
          <span>Jetpack Compose</span>
          <span>Hilt</span>
          <span>Firebase</span>
          <span>WorkManager</span>
          <span>DataStore</span>
        </div>
      </div>
    </div>
    <div className="experience-item">
      <div className="timeline">May 2023 - Present</div>
      <div className="details">
        <h3>Senior Android Developer | Topmate.io</h3>
        <p>
          A BLE-powered fitness app for real-time analytics. Used AWS IoT Core + Kinesis for data streaming. Enabled BLE sync for heart monitors and smartwatches. Reduced BLE latency (25%), improved efficiency (30%), and battery (25%). Enhanced engagement with real-time feedback.
        </p>
        <ul>
          <li>Led BLE-based fitness tracking app with real-time analytics and wearable integration.</li>
          <li>Architected AWS IoT Core + Kinesis for live fitness streaming and BLE sensor accuracy.</li>
          <li>Improved BLE sync latency by 25% and battery usage by 25% per session.</li>
          <li>Enhanced engagement with real-time feedback, Google Maps & Mapbox route tracking.</li>
          <li>Managed 5-person Agile team and scaled cloud performance (30% ops efficiency gain).</li>
        </ul>
        
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
          Mobile Analytics SDK: Tracks app usage and optimizes event data. Used Firebase SDK + BigQuery for analytics. Enabled real-time tracking and scalable storage. Cut costs (30%), improved efficiency (40%), boosted performance (25%). Reduced SDK crashes (35%) through optimized data handling.
        </p>
        <ul>
          <li>Developed high-performance mobile analytics SDK (Kotlin, Coroutines, WorkManager).</li>
          <li>Enabled real-time tracking with Firebase SDK + BigQuery for multi-app analytics.</li>
          <li>Cut data transmission costs by 30%, boosted background task efficiency by 40%.</li>
          <li>Migrated codebase to Kotlin, achieving 25% app performance boost</li>
          <li>Reduced SDK-related crashes by 35% with optimized async data handling.</li>
        </ul>
        
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
          Testimony Share: A social app for secure testimonials. Used Firebase Auth + Firestore. Enabled real-time testimonials. Increased retention (25%), reduced payment errors (30%). Telquel Magazine: A digital magazine. Used Cloud Storage + CDN. Boosted engagement (40%), reduced crashes (20%).
        </p>
        <ul>
          <li>Led team on Testimony Share app (Firebase Auth, Firestore, Google Places API).</li>
          <li>Boosted retention 25% with Compose, Firestore, Cloud CDN optimizations.</li>
          <li>Decreased payment errors by 30%; refactored platform to Kotlin for better UX.</li>
          <li>Rebuilt Telquel Magazine App with Cloud Storage/CDN, cutting load time, boosting engagement by 40%.</li>
        </ul>
        
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
          SmartAccess Technologies: A BLE-powered smart access solution. Used AWS Cognito + Lambda for authentication. Enabled secure access. Improved security (50%), increased satisfaction (15%). Tehillim: A personalized prayer app. Used Firebase Realtime Database. Boosted engagement (25%), reduced crashes (20%).
        </p>
        <ul>
          <li>Built SmartAccess: BLE smart access control app with AWS Cognito, Lambda.</li>
          <li>Boosted access security by 50%; improved UX satisfaction by 15%.</li>
          <li>Developed Tehillim daily prayer app using Firebase Realtime DB + custom navigation.</li>
          <li>Increased engagement 25%; reduced crashes by 20% through better real-time sync.</li>
        </ul>
        
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
    <div className="timeline">Aug 2025 - Aug 2025</div>
      <div className="details">
        <h3>LabOps Metrics Starter Kit</h3>
        <p>
          I built a comprehensive laboratory operations metrics platform that simulates specimen flow, computes turnaround time and throughput analytics, and triggers automated alerts for SLA breaches. The system generates HIPAA-safe synthetic data to mimic real lab events, processes them through a FastAPI backend to calculate engineering metrics, and presents insights through an interactive Streamlit dashboard with real-time KPI monitoring. My implementation included a "What-if" simulation panel for capacity planning, automated Microsoft Teams alerting when thresholds are breached, and Power BI export functionality for enterprise reporting. The project demonstrated end-to-end ownership of a healthcare informatics solution, complete with comprehensive testing, CI/CD pipeline, and agile project management through GitHub Projects and user story documentation.
        </p>
        <ul>
          <li>Built comprehensive lab operations metrics platform with FastAPI backend and Streamlit dashboard.</li>
          <li>Generated HIPAA-safe synthetic data to simulate real laboratory specimen flow and events.</li>
          <li>Implemented real-time KPI monitoring with turnaround time, throughput, and SLA breach analytics.</li>
          <li>Created "What-if" simulation panel for capacity planning and automated Microsoft Teams alerting.</li>
          <li>Added Power BI export functionality and comprehensive testing with CI/CD pipeline.</li>
        </ul>
        <div className="experience-skills">
          <span>Python</span>
          <span>FastAPI</span>
          <span>Streamlit</span>
          <span>SQLite</span>
          <span>Power BI</span>
          <span>Microsoft Teams API</span>
          <span>GitHub Actions</span>
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