import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.div`
  min-height:100dvh; display:flex; align-items:center; justify-content:center;
`;
const Box = styled.div`
  text-align:center; background:#fff; padding:40px; border-radius:10px; border:0.7px solid #D4DBE5;
  box-shadow:${({theme}) => theme.shadow.card};
  h1{ font-size:24px; margin-bottom:10px; }
  a{ color:${({theme})=>theme.colors.brand}; }
`;

export default function NotFound(){
    return (
        <Page>
            <Box>
                <h1>404 — Not Found</h1>
                <p><Link to="/">На главную</Link></p>
            </Box>
        </Page>
    );
}
