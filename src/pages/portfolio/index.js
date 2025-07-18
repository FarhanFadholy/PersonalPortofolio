import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, datasertifikat, meta } from "../../content_option";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <p className="portofolio-desc">{data.description}</p>
                <img src={data.img} alt="" />
                <div className="content">
                  <a href={data.link}>view project</a>
                </div>
              </div>
            );
          })}
        </div>
        <Row className="mb-5 mt-5 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Sertifikat </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {datasertifikat.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <p className="portofolio-desc">{data.description}</p>
                <img src={data.img} alt="" />
                <div className="content">
                  <h5 className="mb-2">{data.title}</h5>
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    view certificate
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
