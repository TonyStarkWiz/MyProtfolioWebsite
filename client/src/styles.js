import styled from 'styled-components';

const breakpoints = {
  mobileS: `max-width: 330px`,
  mobileM: `max-width: 400px`,
  mobileL: `max-width: 480px`,
  tabletS: `max-width: 600px`,
  tabletL: `max-width: 768px`,
  desktopXS: `max-width: 900px`,
  desktopS: `max-width: 1080px`,
  desktopM: `max-width: 1200px`,
  desktopL: `max-width: 1400px`,
};

export const Container = styled.div`
  display: flex;
  padding-left: 40px; /* Add padding here */
  padding-right: 40px; /* Add padding here */

  @media (${breakpoints.tabletL}) {
    flex-direction: column; /* Stack elements vertically on mobile */
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const Sidebar = styled.div`
  margin-left: 15%;
  width: 300px;
  margin-right: 20px; /* Space between sidebar and content */
  height: 100vh; /* Full viewport height */
  position: fixed;
  top: 0;
  left: 0;
  background: #0a192f;
  color: #ccd6f6;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures space between top content and MERNIcons at the bottom */

  h1 {
    font-size: 3rem;
    color: #ccd6f6;
    margin-bottom: 20px;

    @media (${breakpoints.mobileM}) {
      font-size: 2.5rem; /* Adjust font size for smaller screens */
    }
  }

  h2 {
    font-size: 1.5rem;
    color: #8892b0;
    margin-bottom: 20px;

    @media (${breakpoints.mobileM}) {
      font-size: 1.2rem; /* Adjust font size for smaller screens */
    }
  }

  p {
    font-size: 1rem;
    color: #8892b0;
    margin-top: 0.5rem;

    @media (${breakpoints.mobileM}) {
      font-size: 0.875rem; /* Adjust font size for smaller screens */
    }
  }

  @media (${breakpoints.tabletL}) {
    position: relative;
    width: 100%;
    height: auto;
    margin-left: 0;
    margin-right: 0;
    padding: 10px;
  }
`;

export const MainContent = styled.div`
  margin-left: 35%;
  margin-right: 15%;
  width: 60%;
  padding: 2rem 0;
  flex: 1;

  @media (${breakpoints.tabletL}) {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

export const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 1.4rem;
  text-decoration: none;
  color: #ccd6f6;
  font-size: 1.2rem;
  padding-left: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 50px; /* Adjust the length of the line */
    height: 1px;
    background-color: #ccd6f6; /* Line color */
    margin-right: 10px;
    opacity: 0.5;
  }

  &:hover {
    color: #64ffda;
    &::before {
      background-color: #64ffda;
    }
  }

  @media (${breakpoints.mobileL}) {
    font-size: 1rem; /* Adjust font size for smaller screens */
    padding-left: 0.3rem; /* Adjust padding for smaller screens */
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  margin-top: 3rem;

  a {
    margin-right: 1rem;
    color: #8892b0;
    font-size: 1.5rem;

    &:hover {
      color: #64ffda;
    }

    @media (${breakpoints.mobileM}) {
      font-size: 1.2rem; /* Adjust icon size for smaller screens */
      margin-right: 0.5rem; /* Adjust margin for smaller screens */
    }
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 50px 0;
  margin-top: 50px;
  background: #0a192f;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #ccd6f6;

    @media (${breakpoints.tabletL}) {
      font-size: 2rem; /* Adjust font size for smaller screens */
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #8892b0;

    @media (${breakpoints.tabletL}) {
      font-size: 1rem; /* Adjust font size for smaller screens */
    }
  }
`;

export const ExperienceSection = styled.section`
  margin-top: 4rem;

  h2 {
    font-size: 2rem;
    color: #ccd6f6;
    margin-bottom: 2rem;

    @media (${breakpoints.tabletL}) {
      font-size: 1.8rem; /* Adjust font size for smaller screens */
    }
  }

  .experience-item {
    display: flex;
    align-items: flex-start; /* Aligns items at the top */
    margin-bottom: 3rem;

    .timeline {
      width: 150px; /* Adjust width as needed */
      color: #8892b0;
      font-size: 0.875rem;
      text-align: right;
      padding-right: 1rem; /* Adds space between date and job details */
      padding-top: 0.4rem;

      @media (${breakpoints.tabletL}) {
        text-align: left;
        width: 100%;
        padding: 0;
        margin-bottom: 1rem;
      }
    }

    .details {
      flex: 1;
    }

    @media (${breakpoints.tabletL}) {
      flex-direction: column;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #ccd6f6;

    @media (${breakpoints.tabletL}) {
      font-size: 1.3rem; /* Adjust font size for smaller screens */
    }
  }

  span {
    display: block;
    font-size: 1rem;
    color: #8892b0;
    margin-bottom: 0.5rem;

    @media (${breakpoints.tabletL}) {
      font-size: 0.9rem; /* Adjust font size for smaller screens */
    }
  }

  p {
    font-size: 1rem;
    color: #a8b2d1;
    margin-bottom: 1rem;

    @media (${breakpoints.tabletL}) {
      font-size: 0.9rem; /* Adjust font size for smaller screens */
    }
  }

  .experience-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      background-color: rgba(100, 255, 218, 0.1);
      color: #64ffda;
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
      border-radius: 5px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        background-color: rgba(100, 255, 218, 0.25);
        box-shadow: 0 4px 8px rgba(100, 255, 218, 0.3);
      }

      @media (${breakpoints.tabletL}) {
        font-size: 0.75rem; /* Adjust font size for smaller screens */
        padding: 0.2rem 0.5rem; /* Adjust padding for smaller screens */
      }
    }
  }
`;

export const SkillTag = styled.span`
  background-color: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(100, 255, 218, 0.25);
  }

  @media (${breakpoints.tabletL}) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;
