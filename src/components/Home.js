import React from "react";
import "../styles/main.scss";
import "../styles/home.scss";
import { Link } from "react-router";
import Navigation from "./Navigation";
class Home extends React.Component {
  render() {
    let apps = [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/eric-dudley-894721106",
        icon: "fab fa-linkedin",
        same_page: false,
        internal: false
      },
      {
        name: "Resume",
        url: "/resume",
        icon: "fas fa-user",
        same_page: true,
        internal: true
      },
      {
        name: "Email",
        url: "mailto:contact@ericdudley.com",
        icon: "fas fa-envelope",
        same_page: false,
        internal: false
      },
      {
        name: "GitHub",
        url: "https://github.com/ericdudley",
        icon: "fab fa-github",
        same_page: false
      },
      {
        image: "../images/me.jpg"
      },
      {
        name: "GitLab",
        url: "https://gitlab.com/ericdudley/personal-website",
        icon: "fab fa-gitlab",
        same_page: false,
        internal: false
      },
      {
        name: "Photos",
        url: "/photographer",
        icon: "fas fa-camera",
        same_page: true,
        internal: true
      },
      {
        name: "Stretch",
        url: "/stretch",
        icon: "fas fa-child",
        same_page: true,
        internal: true
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/ericdudleyphotography/",
        icon: "fab fa-instagram",
        same_page: false,
        internal: false
      }
    ];

    let apps_markup = [];
    for (let i = 0; i < apps.length; i++) {
      const app = apps[i];
      const app_content = (
        <div className="app-wrapper">
          {app.image && <div className="app-image" />}
          {app.icon && (
            <div>
              <i className={"app-icon " + app.icon} />
              <span className="app-name">{app.name}</span>
            </div>
          )}
        </div>
      );
      apps_markup.push(
        <div className="app-grid-item" key={`app` + i}>
          {app.internal ? (
            <Link to={app.url}>{app_content}</Link>
          ) : (
            <a
              href={app.url}
              target={app.same_page ? "_self" : "_blank"}
              key={`app` + i}
            >
              {app_content}
            </a>
          )}
        </div>
      );
    }

    return (
      <div id="home">
        <Navigation />
        <section>{apps_markup}</section>
      </div>
    );
  }
}

export default Home;
