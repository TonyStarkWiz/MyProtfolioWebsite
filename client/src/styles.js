import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Flex direction as row by default for desktop */
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  box-sizing: border-box; /* Ensure padding is included in the element's width */

  /* Mobile Styles */
  @media (max-width: 768px) {
    flex-direction: row; /* Stack elements vertically on mobile */
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #0a192f;
  color: #ccd6f6;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1; /* Ensure sidebar stays on top */

  /* Mobile Styles */
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const MainContent = styled.div`
  margin-left: 320px; /* Adjust based on Sidebar's width */
  padding: 2rem 0;
  flex: 1;
  width: calc(100% - 320px); /* Adjust content width */
  box-sizing: border-box; /* Ensure padding is included in the element's width */

  /* Mobile Styles */
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 1rem 0;
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
    width: 50px;
    height: 1px;
    background-color: #ccd6f6;
    margin-right: 10px;
    opacity: 0.5;
  }

  &:hover {
    color: #64ffda;
    &::before {
      background-color: #64ffda;
    }
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    font-size: 1rem;
    padding-left: 0.3rem;
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
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 2rem;
    justify-content: center;
    a {
      margin-right: 0.5rem;
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
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #8892b0;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    padding: 20px 0;
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const ExperienceSection = styled.section`
  margin-top: 4rem;

  h2 {
    font-size: 2rem;
    color: #ccd6f6;
    margin-bottom: 2rem;
  }

  .experience-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 3rem;

    .timeline {
      width: 150px;
      color: #8892b0;
      font-size: 0.875rem;
      text-align: right;
      padding-right: 1rem;
      padding-top: 0.4rem;
    }

    .details {
      flex: 1;
    }

    @media (max-width: 768px) {
      flex-direction: row;

      .timeline {
        text-align: left;
        width: 100%;
        padding: 0;
        margin-bottom: 1rem;
      }
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #ccd6f6;
  }

  span {
    display: block;
    font-size: 1rem;
    color: #8892b0;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #a8b2d1;
    margin-bottom: 1rem;
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
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      gap: 0.25rem;
      span {
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
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

  /* Mobile Styles */
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;
