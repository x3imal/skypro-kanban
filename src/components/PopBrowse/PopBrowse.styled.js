import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed; inset: 0;
    display: ${({ open }) => (open ? "flex" : "none")};
    align-items: center; justify-content: center;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
`;

export const Box = styled.div`
    background: #fff;
    max-width: 630px; width: 100%;
    padding: 40px 30px 38px;
    border-radius: 10px;
    border: 0.7px solid #D4DBE5;
    position: relative;
    box-shadow: 0px 4px 67px -12px rgba(0,0,0,0.13);
`;

export const Content = styled.div`
    display: block; text-align: left;
`;

export const Top = styled.div`
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
`;

export const Ttl = styled.h3`
    color: #000; font-size: 20px; font-weight: 600; line-height: 24px; margin:0;
`;

export const CatBadge = styled.div`
    display:inline-block; height: 30px; padding: 8px 20px; border-radius: 24px;
    opacity: 1;
    background: ${({ theme, $category="gray" }) => theme.colors.badge?.[$category]?.bg || theme.colors.badge.gray.bg};
    p { font-size:14px; font-weight:600; line-height:14px;
        color: ${({ theme, $category="gray" }) => theme.colors.badge?.[$category]?.fg || theme.colors.badge.gray.fg}; }
`;

export const Wrap = styled.div`
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 24px;
`;

export const Form = styled.form`
    max-width: 370px; width: 100%; display:block; margin-bottom:20px;
`;

export const Field = styled.div`
    display:flex; flex-direction:column;
`;

export const Label = styled.label`
    color:#000; font-size:14px; font-weight:600; line-height:1; margin-bottom:14px;
`;

export const StatusPill = styled.span`
    display:inline-block; border-radius:24px; border:0.7px solid rgba(148,166,190,0.4);
    color:#94A6BE; padding:11px 14px 10px; margin-right:7px; margin-bottom:7px; font-size:14px;
`;

export const Area = styled.textarea`
    max-width: 370px; width:100%;
    outline:none; padding:14px;
    background:#EAEEF6;
    border:0.7px solid rgba(148,166,190,0.4);
    border-radius:8px;
    font-size:14px; letter-spacing:-0.14px;
    margin-top:14px; height:200px; resize: none;
    &::placeholder { color:#94A6BE; }
`;

export const Footer = styled.div`
    display:flex; flex-wrap:wrap; align-items:flex-start; justify-content:space-between;
    margin-top: 10px;
    .btn-group { display:flex; gap:8px; flex-wrap:wrap; }
`;

export const Btn = styled.button`
    height:30px; padding:0 14px;
    border-radius:4px; background:transparent; color:${({theme})=>theme.colors.brand};
    border:0.7px solid ${({theme})=>theme.colors.brand};
    font-weight:500; cursor:pointer;
`;

export const BtnDanger = styled(Btn)`
    border-color:#565EEF; color:#565EEF;
`;

export const BtnPrimary = styled.button`
    height:30px; padding:0 14px; border-radius:4px; border:none;
    background:${({theme})=>theme.colors.brand}; color:#fff; cursor:pointer; font-weight:500;
`;

export const Mobile = {
    Wrap: styled(Wrap)`
    @media (max-width: ${({theme})=>theme.breakpoints.sm}) { display:block; }
  `,
    Form: styled(Form)`
    @media (max-width: ${({theme})=>theme.breakpoints.sm}) { max-width:100%; }
  `,
};
