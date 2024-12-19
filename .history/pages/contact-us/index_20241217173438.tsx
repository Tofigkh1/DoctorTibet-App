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
 <>
 </>
  );
}
