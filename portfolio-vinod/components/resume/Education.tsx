import educationData from "@/data/education.json";

type EducationItem = {
  date: string;
  title: string;
  specialization?: string;
  source: {
    name: string;
    link: string;
  };
  description: string;
};

export default function Education() {
  return (
    <div id="education" className="content__block block-large">
      {/* H3 Block Start */}
      <div className="section-h3">
        <h3 className="h3__title animate-in-up">Education</h3>
      </div>
      {/* H3 Block End */}
      {/* Education Lines Start */}
      <div className="container-fluid p-0 resume-lines">
        {(educationData as EducationItem[]).map((item, idx) => (
          <div className="row g-0 resume-lines__item animate-in-up" key={idx}>
            <div className="col-12 col-md-3">
              <span className="resume-lines__date animate-in-up fw-bold">
                {item.date}
              </span>
            </div>
            <div className="col-12 col-md-4">
              <h5 className="resume-lines__title animate-in-up m-0">
                {item.title}
              </h5>
              {item.specialization && (
                <div className="mt-1">
                  <span className="edu-spec-badge rounded-tag px-2 py-1" style={{ fontSize: "0.8rem" }}>
                    Specialization: {item.specialization}
                  </span>
                </div>
              )}
              <p className="resume-lines__source animate-in-up small mt-2">
                {item.source.name}
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
    </div>
  );
}
