import styled from "styled-components";

export const Header = styled.header`
  width:100%;
  margin:0 auto;
  background:${({theme}) => theme.colors.white};
`;

export const Container = styled.div`
  max-width:1260px;
  margin:0 auto;
  padding:0 30px;
`;

export const HeaderBar = styled.div`
  height:70px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  position:relative;
`;

export const Logo = styled.div`
  a { display:inline-flex; }
  img { width:85px; height:auto; display:block; }
`;

export const Nav = styled.nav`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:20px;
`;

export const PrimaryBtn = styled.a`
  width:178px; height:30px;
  display:inline-flex; align-items:center; justify-content:center;
  border:none; border-radius:${({theme}) => theme.radius.sm};
  background:${({theme}) => theme.colors.brand};
  color:#fff; font-size:14px; font-weight:500;
  &:hover{ background:${({theme}) => theme.colors.hoverBrand}; }
`;

export const UserLink = styled.a`
  display:inline-flex; align-items:center; height:30px;
  color:${({theme}) => theme.colors.brand};
  &:hover{ color:${({theme}) => theme.colors.hoverBrand}; }
  &::after{
    content:""; display:block; width:6px; height:6px; margin:-6px 0 0 5px;
    border-left:1.9px solid currentColor; border-bottom:1.9px solid currentColor;
    transform:rotate(-45deg);
  }
`;