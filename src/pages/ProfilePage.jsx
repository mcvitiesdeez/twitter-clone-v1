import { Navbar, Container, Row } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import useLocalStorage from "use-local-storage";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";

export default function ProfilePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    );
}


