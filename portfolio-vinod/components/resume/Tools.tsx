import skillsData from "@/data/tools.json";

type SkillCategory = {
  category: string;
  skills: string[];
  icon: string;
};

export default function Tools() {
  return (
    <div id="skills" className="content__block block-large">
      {/* Content Block - H3 Block Start */}
      <div className="section-h3">
        <h3 className="h3__title animate-in-up">Technical Skills</h3>
      </div>
      {/* Content Block - H3 Block End */}
      
      {/* Skills Grid Start */}
      <div className="container-fluid p-0">
        <div className="row g-3">
          {(skillsData as SkillCategory[]).map((cat, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4 animate-in-up">
              <div
                className="skills-card p-4 h-100 rounded-4"
                style={{
                  background: "var(--card-bg, rgba(255, 255, 255, 0.05))",
                  border: "1px solid var(--border-color, rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <i className={`${cat.icon} fs-3 me-3 text-accent`} style={{ color: "var(--accent, #ff6b00)" }} />
                  <h5 className="m-0 fw-bold">{cat.category}</h5>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-tag px-3 py-1"
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Skills Grid End */}
    </div>
  );
}
