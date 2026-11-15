import socials from "@/data/socials.json";
import Image from "next/image";

export default function Profile({
  profileImage = "/img/avatars/vinodkumar-chavan.jpg",
}) {
  return (
    <div id="avatar" className="avatar animate-fade">
      <div className="avatar__container d-flex flex-column justify-content-lg-between">
        {/* image and logo */}
        <div className="avatar__block">
          <div className="avatar__logo d-flex align-items-center mb-3">
            <div className="logo__image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
              >
                <defs>
                  <linearGradient
                    id="gradientFill"
                    x1="9.9604"
                    y1="75.0338"
                    x2="75.0387"
                    y2="9.9555"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#gradientFill)"
                  d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
              c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
              v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
              C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
              h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
              v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
              h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
              h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                />
              </svg>
            </div>
            <div className="logo__caption ps-3">
              <p className="fw-bold profile-name m-0">
                Vinodkumar
                <br />
                Chavan
              </p>
            </div>
          </div>
          <div className="avatar__image">
            <Image
              alt="Vinodkumar Chavan - Embedded Software Engineer"
              src={profileImage}
              width={1024}
              height={1024}
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>

        {/* data caption #1 */}
        <div className="avatar__block">
          <h6 className="avatar-caption-heading">
            <small className="top d-block mb-1">Specialization:</small>
            <span className="avatar-caption-value">Embedded Software Engineer</span>
          </h6>
        </div>

        {/* data caption #2 */}
        <div className="avatar__block">
          <h6 className="avatar-caption-heading">
            <small className="top d-block mb-1">Based in:</small>
            <span className="avatar-caption-value">Jayanagar, Bengaluru, Karnataka</span>
          </h6>
        </div>

        {/* socials and CTA button */}
        <div className="avatar__block">
          <div className="avatar__socials mb-4">
            <ul className="socials-square d-flex justify-content-center gap-3">
              {socials.map((item, i) => (
                <li key={i} className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.title || "Social"}
                  >
                    <i className={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="avatar__btnholder">
            <a
              className="btn btn-default btn-fullwidth btn-hover btn-hover-accent"
              href="#contact"
            >
              <span className="btn-caption">Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
