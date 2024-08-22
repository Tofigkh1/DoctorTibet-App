// pages/index.js

import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Nav = styled.nav`
  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 15px;
  }

  & li {
    display: inline;
  }

  & a {
    color: white;
    text-decoration: none;
  }
`;

const MainSection = styled.section`
  position: relative;
  display: flex;
  padding: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
`;

const MainContent = styled.div`
  flex: 1;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    max-width: 100%;
    height: auto;
  }
`;

const Curve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const DepartmentsSection = styled.section`
  padding: 50px;
  background-color: #fff;
`;

const DepartmentList = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Department = styled.div`
  text-align: center;
  max-width: 150px;
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <Logo>Remedial</Logo>
        <Nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Department</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </Nav>
      </Header>

      <MainSection>
        <Curve />
      
        <MainContent>
          <h1>Complete health care solutions for everyone</h1>
          <p>
            We have very caring and compassionate doctors and staff to take care of
            your health. Digital diagnostic equipment and system are used to provide
            international standard treatment.
          </p>
          <button>Book An Appointment</button>
        </MainContent>
        <ImageWrapper>
          <img src="/doctor-image.png" alt="Doctor" />
        </ImageWrapper>
      </MainSection>

      <DepartmentsSection>
        <h2>Different Types of Departments</h2>
        <DepartmentList>
          <Department>
            <h3>Medicine</h3>
            <p>Diagnosis, treatment, and prevention of non-surgical conditions in adults.</p>
          </Department>
          <Department>
            <h3>Dentistry</h3>
            <p>Emergency and multidisciplinary comprehensive care in environments care for patients with special needs.</p>
          </Department>
          <Department>
            <h3>Cardiology</h3>
            <p>If you fear that you might have significant heart or related condition, you will often call on a cardiologist for help.</p>
          </Department>
          <Department>
            <h3>Neurology</h3>
            <p>Neurologist manage to treat neurological conditions such as the brain, muscles, blood, vessels, nerves.</p>
          </Department>
          <Department>
            <h3>Eye Surgery</h3>
            <p>We have dozens of skilled doctors and staff who are working together to ensure top class care and successful recovery.</p>
          </Department>
        </DepartmentList>
      </DepartmentsSection>
    </Container>
  );
}
