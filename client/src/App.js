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
        <h3>
          <a 
            href="https://play.google.com/store/apps/details?id=anthony.project.dancelink" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Founder & Lead Software Engineer – DanceLink
          </a>
        </h3>
        <p>
          Founded engineered DanceLink—comprehensive dance ecosystem with AI-powered event discovery, real-time partner matching, premium subscriptions. Built from zero using Kotlin/Compose, SwiftUI, and React.js with Firebase backend. Delivered 50% conversion improvement, 65% cost reduction, 40% faster matching through intelligent algorithms.
        </p>
        <ul>
          <li>Architected complete DanceLink ecosystem across Android (Kotlin/Compose), iOS (SwiftUI), and Web (React.js) with Firebase backend—implementing AI-powered event discovery, real-time partner matching, premium subscription billing, and global location services supporting 80+ countries.</li>
          <li>Engineered sophisticated monetization system with Google Play Billing integration, multi-tier pricing ($14.99/month, $149.99/year), high-converting paywalls, and 30-day money-back guarantee—achieving 50% conversion improvement and 65% cost reduction through intelligent caching and Meta-style infrastructure.</li>
          <li>Built comprehensive event discovery platform integrating Dance Events API, Eventbrite API, and Google Custom Search with AI-powered event generation, real-time caching, and intelligent fallback systems—enabling users to discover dance events across 5 continents with smart postal code validation.</li>
          <li>Developed advanced partner matching system with bilateral matching algorithms, real-time notifications, event-based compatibility scoring, and automatic chat creation—reducing matching time by 40% and increasing user engagement by 60% through sophisticated preference tracking.</li>
          <li>Implemented enterprise-grade features including real-time chat with typing indicators, video upload/compression using Media3, glassmorphism UI with Material 3, international postal code support, and comprehensive security with Firebase App Check—delivering 45% performance improvement and 70% API call reduction.</li>
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
                          <h3>
           <a 
             href="https://play.google.com/store/apps/details?id=com.spectrum.tv.android.tvsa&hl=en_US" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{
               textDecoration: 'none',
               color: 'inherit',
               cursor: 'pointer'
             }}
             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
           >
             Software Engineer IV - Android Engineer | Charter Communications
           </a>
         </h3>
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
           <a 
             href="https://play.google.com/store/apps/details?id=com.TestimonyShare.android" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{
               textDecoration: 'none',
               color: 'inherit',
               cursor: 'pointer'
             }}
             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
           >
             Testimony Share
           </a>
                       : A social app for secure testimonials. Used Firebase Auth + Firestore. Enabled real-time testimonials. Increased retention (25%), reduced payment errors (30%). <a 
              href="https://play.google.com/store/apps/details?id=com.mobiblanc.telquel" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Telquel Magazine
            </a>: A digital magazine. Used Cloud Storage + CDN. Boosted engagement (40%), reduced crashes (20%).
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
           <a 
             href="https://play.google.com/store/apps/details?id=com.smartaccesstechnologies.smartaccess" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{
               textDecoration: 'none',
               color: 'inherit',
               cursor: 'pointer'
             }}
             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
           >
             SmartAccess Technologies
           </a>: A BLE-powered smart access solution. Used AWS Cognito + Lambda for authentication. Enabled secure access. Improved security (50%), increased satisfaction (15%). <a
             href="https://play.google.com/store/apps/details?id=org.chabad.tehillim"
             target="_blank"
             rel="noopener noreferrer"
             style={{
               textDecoration: 'none',
               color: 'inherit',
               cursor: 'pointer'
             }}
             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
           >
             Tehillim
           </a>: A personalized prayer app. Used Firebase Realtime Database. Boosted engagement (25%), reduced crashes (20%).
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
                 <h3>
                       <a 
              href="https://tonystarkwiz.github.io/labops-metrics-starter-kit/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              LabOps Metrics Starter Kit
            </a>
         </h3>
                                   <p>
            I built a lab operations metrics platform in Python using FastAPI, Power BI, and GitHub Pages to simulate specimen flow, analyze KPIs, trigger SLA alerts, and support capacity planning—delivering a fully tested, CI/CD-enabled healthcare informatics solution with real-time enterprise reporting.
          </p>
                 <ul>
           <li>Built comprehensive lab operations metrics platform with a Python FastAPI backend and deployed dashboard.</li>
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