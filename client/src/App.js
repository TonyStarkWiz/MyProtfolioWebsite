import React from 'react';
import './App.css';

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
          I founded and engineered DanceLink, a comprehensive dance ecosystem with AI-powered event discovery, real-time partner matching, and premium subscriptions. Delivered the full platform using Kotlin/Compose, SwiftUI, React Native, and React.js—chosen to optimize native performance while enabling rapid cross-platform and web delivery.
        </p>
        <p>
          I built and maintained the entire codebase for Android, iOS, and web apps on a Firebase backend, enabling users to discover events, find compatible partners, and access premium features. I designed and implemented an AI-driven event discovery engine that solved fragmentation across inconsistent APIs, mislabeled metadata, and missing keywords, ensuring dancers only saw accurate and relevant events worldwide.
        </p>
        <ul>
          <li>I developed a comprehensive event discovery pipeline integrating Dance Events API, Eventbrite API, and Google Custom Search with real-time caching and intelligent fallback systems—scaling the service across 5 continents with smart postal code validation.</li>
          <li>I engineered an advanced partner-matching system with bilateral algorithms, compatibility scoring, and automatic chat creation. This reduced matching time by 40% and increased engagement by 60%, supported by real-time push notifications and chat built with Firebase.</li>
          <li>I implemented enterprise-grade features including real-time chat with typing indicators, video upload/compression with Media3, a glassmorphism UI in Material 3, international postal code support, and robust security with Firebase App Check. These enhancements delivered a 45% performance boost and 70% reduction in API calls.</li>
          <li>My efforts unified Android, iOS, and web delivery into a single ecosystem that drove measurable impact: 50% higher conversion, 65% cost reduction, and 40% faster matching. DanceLink demonstrates how thoughtful technology choices across multiple frameworks can deliver a seamless global experience and strong business outcomes.</li>
        </ul>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Swift</span>
          <span>React.js</span>
          <span>React Native</span>
          <span>SwiftUI</span>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>MVVM</span>
          <span>Jetpack Compose</span>
          <span>Hilt</span>
          <span>Firebase</span>
          <span>WorkManager</span>
          <span>DataStore</span>
          <span>REST APIs</span>
          <span>Git</span>
          <span>GitHub</span>
          <span>AI agent</span>
        </div>
      </div>
    </div>
    <div className="experience-item">
      <div className="timeline">05/2023 to Current</div>
      <div className="details">
        <h3>Lead Software Engineer | Topmate.io – Port St. Lucie, FL</h3>
        <p>
          Led cross-platform BLE fitness ecosystem (Android, iOS, Web) with AWS IoT Core + Kinesis streaming and AI agent coaching. Improved latency (-25%), battery (-25%), and ops efficiency (+30%), boosting engagement and scaling to thousands of users in real time.
        </p>
        <ul>
          <li>I led a cross-platform BLE-powered fitness ecosystem with real-time analytics, wearable integration, and AI-driven feedback.</li>
          <li>Kotlin (Compose), SwiftUI, and React.js powered device sync, dashboards, and AI coaching, while AWS IoT Core + Kinesis streamed biometric data securely.</li>
          <li>The code enabled seamless device pairing, reduced sync latency, optimized battery, and scaled live analytics with personalized AI training insights.</li>
          <li>We improved cloud efficiency by 30%, boosted retention with real-time insights, and scaled reliably to thousands of concurrent users.</li>
          <li>I unified mobile, web, and cloud delivery, mentored a 5-person team, and drove AI features from concept to launch, ensuring measurable user and business impact.</li>
        </ul>
        
        <div className="experience-skills">
          <span>Kotlin</span>
          <span>Swift</span>
          <span>React.js</span>
          <span>React Native</span>
          <span>SwiftUI</span>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>REST APIs</span>
          <span>Git</span>
          <span>GitHub</span>
          <span>AWS IoT Core</span>
          <span>Kinesis</span>
          <span>AI Coaching</span>
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