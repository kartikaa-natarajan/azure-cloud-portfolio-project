import services from "@/data/services.json";

export default function About() {
  return (
    <section id="about" className="inner about">
      {/* Content Block - H2 Section Title Start */}
      <div className="content__block section-grid-title">
        <p className="h2__subtitle animate-in-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="13px"
            height="13px"
            viewBox="0 0 13 13"
            fill="currentColor"
          >
            <path
              fill="currentColor"
              d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
            />
          </svg>
          <span>About Me</span>
        </p>
        <h2 className="h2__title animate-in-up">
          Embedded Software Engineer with background in embedded systems & cloud tech
        </h2>
      </div>
      {/* Content Block - H2 Section Title End */}

      {/* Content Block - About Me Data Start */}
      <div className="content__block grid-block block-large">
        <div className="container-fluid p-0">
          <div className="row g-0 justify-content-between">
            {/* About Me Description Start */}
            <div className="col-12 col-xl-8 grid-item about-descr">
              <p className="about-descr__text animate-in-up" style={{ fontSize: "1.6rem", lineHeight: "1.75" }}>
                Embedded Software Engineer with professional experience at TUCKIT Lockers, including prior experience as an SDE Intern at the same organization. Currently pursuing an MCA in Cloud Computing with specialization in <strong>Storage and Cloud Technology</strong> at Jain (Deemed-to-be University), Bengaluru.
              </p>
              <p className="about-descr__text animate-in-up" style={{ fontSize: "1.6rem", lineHeight: "1.75" }}>
                Hands-on knowledge of AWS, Python, Linux, SQL, Data Structures & Algorithms, and Computer Networking. Experienced in software development, testing, debugging, troubleshooting, and collaborating in engineering environments. Passionate about embedded systems, cloud technologies, storage systems, and reliable software development.
              </p>
              <div className="btn-group about-descr__btnholder animate-in-up mt-4">
                <a
                  className="btn mobile-vertical btn-default btn-hover btn-hover-accent"
                  href="/Vinodkumar_Chavan_Resume.pdf"
                  download="Vinodkumar_Chavan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-caption">Download Resume</span>
                  <i className="ph-bold ph-download-simple" />
                </a>
              </div>
            </div>
            {/* About Me Description End */}

            {/* About Me Information Start */}
            <div className="col-12 col-xl-4 grid-item about-info">
              <div className="about-info__item animate-in-up">
                <h6>
                  <small className="top d-block mb-1">Name</small>
                  <span className="fw-bold">Vinodkumar Chavan</span>
                </h6>
              </div>
              <div className="about-info__item animate-in-up mt-3">
                <h6>
                  <small className="top d-block mb-1">Phone</small>
                  <a className="text-link-bold" href="tel:+917624946296">
                    +91 7624946296
                  </a>
                </h6>
              </div>
              <div className="about-info__item animate-in-up mt-3">
                <h6>
                  <small className="top d-block mb-1">Email</small>
                  <a
                    className="text-link-bold"
                    href="mailto:vnchavan111@gmail.com"
                  >
                    vnchavan111@gmail.com
                  </a>
                </h6>
              </div>
              <div className="about-info__item animate-in-up mt-3">
                <h6>
                  <small className="top d-block mb-1">Location</small>
                  <span className="text-link-bold">
                    Jayanagar, Bengaluru, Karnataka
                  </span>
                </h6>
              </div>
            </div>
            {/* About Me Information End */}
          </div>
        </div>
      </div>
      {/* Content Block - About Me Data End */}

      {/* Content Block - Services / Specialization Cards Start */}
      <div className="content__block grid-block">
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-stretch cards">
            {services.map(
              (
                service: {
                  title: string;
                  tags: string[];
                  text: string;
                  img: string;
                },
                idx: number
              ) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 cards__item grid-item animate-card-2"
                >
                  <div className="cards__card d-flex flex-column h-100 p-4">
                    <div className="cards__descr">
                      <h4 className="cards__title animate-in-up mb-2">
                        {service.title}
                      </h4>
                      <div className="cards__tags d-flex flex-wrap animate-in-up mb-3">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="rounded-tag tag-outline me-2 mb-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="small cards__text animate-in-up text-muted">
                        {service.text}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Content Block - Services End */}
    </section>
  );
}
