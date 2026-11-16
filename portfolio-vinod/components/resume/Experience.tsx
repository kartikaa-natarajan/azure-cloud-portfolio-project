import experienceItems from "@/data/experiences.json";

type ExperienceItem = {
  date: string;
  title: string;
  agency: {
    name: string;
    link: string;
  };
  description: string;
};

export default function Experience() {
  return (
    <div id="experience" className="content__block block-large">
      {/* H3 Block Start */}
      <div className="section-h3">
        <h3 className="h3__title animate-in-up">Professional Experience</h3>
      </div>
      {/* H3 Block End */}
      {/* Experience Lines Start */}
      <div className="container-fluid p-0 resume-lines">
        {(experienceItems as ExperienceItem[]).map((item, idx) => (
          <div
            className={`row g-0 resume-lines__item animate-in-up ${
              idx === 0 ? "current-role p-3 rounded-3 mb-3" : ""
            }`}
            style={
              idx === 0
                ? {
                    background: "rgba(255, 107, 0, 0.05)",
                    borderLeft: "3px solid var(--accent, #ff6b00)",
                  }
                : {}
            }
            key={idx}
          >
            <div className="col-12 col-md-3">
              <span className="resume-lines__date animate-in-up fw-bold text-accent">
                {item.date}
              </span>
            </div>
            <div className="col-12 col-md-4">
              <h5 className="resume-lines__title animate-in-up m-0 d-flex align-items-center gap-2">
                {item.title}
                {idx === 0 && (
                  <span
                    className="badge bg-accent px-2 py-1"
                    style={{
                      fontSize: "0.7rem",
                      background: "var(--accent, #ff6b00)",
                      color: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    Current Role
                  </span>
                )}
              </h5>
              <p className="resume-lines__source animate-in-up small text-muted mt-1">
                {item.agency.name}
              </p>
            </div>
            <div className="col-12 col-md-5">
              <p className="small resume-lines__descr animate-in-up">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Experience Lines End */}
    </div>
  );
}
