import { Button, Col, Image, Nav, Row, Spinner } from 'react-bootstrap'
import ProfilePostCard from './ProfilePostCard'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function ProfileMidBody() {
    const [posts, setPosts] = useState([]);
    const url = "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    const fetchPosts = (userId) => {
        fetch(`https://8ab5a041-0ba3-4f7b-8a44-36be1bedff84-00-3ttw70bhq1idl.sisko.replit.dev/posts/user/${userId}`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error: ", error));
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId)
        }
    }, [])

    return (
        <Col sm={6} className='gb-light' style={{ bborder: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                }}
            />
            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className='rounded-pill mt-2' variants="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>
            <p className='mt-5' style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Tjun
            </p>
            <p style={{ marginBottom: "2px" }}>@tengtjun.ong</p>
            <p>I help myself switch careers to be a software developer at sigmaschool.co</p>
            <p>Entreprenuer</p>
            <p>
                <strong>271</strong> Folowwing <strong>610</strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} />
            ))}
        </Col>
    )
}
