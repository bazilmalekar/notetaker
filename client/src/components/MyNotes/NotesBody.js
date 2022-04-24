import React from 'react'
import { Container, Row } from 'react-bootstrap';

const NotesBody = ({title, children}) => {;
  return (
    <div className="notes_body">
      <Container className="col-lg-8">
          <Row className="mx-auto">
            <div className="notes_title mt-5">
                {
                    title && (
                        <>
                            <h1>{title}</h1>
                            <hr />
                        </>
                    )
                }
                {children}
            </div>
          </Row>
      </Container>
    </div>
  )
}

export default NotesBody;
