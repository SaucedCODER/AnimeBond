import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Nav,
  Navbar,
  Stack,
} from "react-bootstrap";

function NavBar({ getAnimeList }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Navbar expand="lg" className="mb-4" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">AnimeBond</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex my-auto">
            <Form.Control
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="me-2 outline-none border-none"
              aria-label="Search"
            />

            <Button
              variant="outline-success"
              onClick={(e) => {
                e.preventDefault();
                getAnimeList(searchTerm);
              }}
            >
              Search
            </Button>
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="#" className="text-blue">
              Follow Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  const [animeData, setAnimeData] = useState([]);

  const getAnimeList = (searchTerm = "") => {
    const apiUrl = `https://api.jikan.moe/v4/anime${
      searchTerm ? "?q=" + searchTerm : ""
    }`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(({ data }) => {
        console.log(data);
        setAnimeData(data);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
      });
  };

  useEffect(() => {
    return () => getAnimeList();
  }, []);

  return (
    <div>
      <NavBar getAnimeList={getAnimeList} />

      <Container>
        <Row>
          {animeData?.length > 0 ? (
            animeData.map((anime) => (
              <Col sm={6} md={4} lg={2} key={anime.mal_id} className="mb-3">
                <Card>
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      height={300}
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="item-img"
                    />
                  </div>

                  <Card.Body className="bg-body-tertiary">
                    <Card.Text>
                      <Stack gap={3} className="text-center">
                        <div className=" text-truncate">{anime.title}</div>
                        <div className="text-body-secondary">
                          Episode {anime.episodes}
                        </div>
                      </Stack>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <span>no anime found!</span>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
