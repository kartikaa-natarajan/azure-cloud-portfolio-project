"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import portfolioItems from "@/data/portfolios.json";
import Lightbox, { FullscreenRef } from "yet-another-react-lightbox";
import {
  Captions,
  Fullscreen,
  Share,
  Zoom,
} from "yet-another-react-lightbox/plugins";

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const captionsRef = useRef(null);
  const fullscreenRef = useRef<FullscreenRef>(null);
  const zoomRef = useRef(null);

  return (
    <>
      <section id="portfolio" className="inner inner-first portfolio">
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
            <span>Projects</span>
          </p>
          <h2 className="h2__title animate-in-up">
            Featured Projects
          </h2>
        </div>
        {/* Content Block - H2 Section Title End */}

        {/* Content Block - Works Gallery Start */}
        <div className="content__block grid-block">
          <div className="container-fluid px-0 inner__gallery">
            <div className="row g-4">
              {portfolioItems.map((item, idx) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 grid-item animate-in-up"
                  data-delay={idx % 2 ? "0.3" : "0"}
                >
                  <div
                    className="project-card h-100 p-4 rounded-4"
                    style={{
                      background: "var(--card-bg, rgba(255, 255, 255, 0.04))",
                      border: "1px solid var(--border-color, rgba(255, 255, 255, 0.1))",
                      borderRadius: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        className="project-image-wrapper rounded-3 overflow-hidden mb-3"
                        style={{ cursor: "pointer", position: "relative", height: "220px" }}
                        onClick={() => {
                          setOpen(true);
                          setActiveIndex(idx);
                        }}
                      >
                        <Image
                          className="w-100 h-100"
                          alt={item.alt}
                          src={item.src}
                          width={800}
                          height={450}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <h4 className="fw-bold mb-2">{item.title}</h4>
                      
                      <div className="card__tags d-flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className={tag.className}>
                            {tag.text}
                          </span>
                        ))}
                      </div>

                      <p className="small text-muted mb-3" style={{ lineHeight: "1.6" }}>
                        {item.description}
                      </p>

                      {item.features && item.features.length > 0 && (
                        <div className="mb-3">
                          <span className="fw-semibold small d-block mb-1 text-accent" style={{ color: "var(--accent, #ff6b00)" }}>
                            Key Features:
                          </span>
                          <ul className="small ps-3 m-0 text-muted">
                            {item.features.map((feat, fIdx) => (
                              <li key={fIdx}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Content Block - Works Gallery End */}
      </section>

      <Lightbox
        open={open}
        plugins={[Captions, Fullscreen, Share, Zoom]}
        captions={{
          ref: captionsRef,
          descriptionTextAlign: "center",
        }}
        className="yarl__portfolio"
        fullscreen={{ ref: fullscreenRef }}
        on={{
          click: () => fullscreenRef.current?.enter(),
        }}
        zoom={{ ref: zoomRef }}
        close={() => setOpen(false)}
        index={activeIndex}
        slides={portfolioItems.map((item) => ({
          src: item.src,
          title: item.title,
          description: item.description,
          imageFit: "contain",
        }))}
      />
    </>
  );
}
