import { Button, Col, Row, Image } from "react-bootstrap"

export default function ProfilePostCard({ content, postId }) {
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
    const BASE_URL = "https://8ab5a041-0ba3-4f7b-8a44-36be1bedff84-00-3ttw70bhq1idl.sisko.replit.dev";

    return (
        <Row className="p-3"
            style={{ borderTop: "1px, solid #D3D3D3", borderBottom: "1px, solid #D3D3D3" }}>
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Tjun</strong>
                <span> @tengtjun . Sept 19</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-heart"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>
        </Row>
    )
}
