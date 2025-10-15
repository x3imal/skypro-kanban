import styled from "styled-components";
import { useAuth } from "../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  min-height: 100dvh; display:flex; align-items:center; justify-content:center;
  background: ${({theme}) => theme.colors.bg};
`;
const Box = styled.div`
  width: 370px; background:#fff; border:0.7px solid #D4DBE5; border-radius:10px;
  padding: 40px; box-shadow: ${({theme}) => theme.shadow.card}; text-align:center;
`;
const Row = styled.div`
  display:flex; gap:10px; justify-content:center; margin-top:16px;
  & > button {
    height:30px; padding:0 16px; border-radius:4px; cursor:pointer;
    border: 0.7px solid ${({theme}) => theme.colors.brand};
  }
  & > button._primary {
    background: ${({theme}) => theme.colors.brand}; color:#fff; border:none;
  }
`;

export default function ExitPage(){
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <Page>
            <Box>
                <h2>Выйти из аккаунта?</h2>
                <Row>
                    <button className="_primary" onClick={() => { logout(); navigate("/login", {replace:true}); }}>
                        Да, выйти
                    </button>
                    <button onClick={() => navigate(-1)}>Отмена</button>
                </Row>
            </Box>
        </Page>
    );
}
