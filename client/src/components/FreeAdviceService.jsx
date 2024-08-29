import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import img4 from '../../src/assets/4.jpg';  
import img5 from '../../src/assets/5.jpg';

const FreeAdviceService = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <Container className="my-5">
                <Row>
                    <Col md={6}>
                        <img src={img4} alt="img4" style={{ width: '100%' }} />
                    </Col>
                    <Col md={6}>
                        <img src={img5} alt="img5" style={{ width: '100%' }} />
                    </Col>
                </Row>
            </Container>
            {/* <Footer /> */}
        </div>
    );
};

export default FreeAdviceService;
