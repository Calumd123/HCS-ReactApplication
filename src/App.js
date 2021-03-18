import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./css/skel.css";
import "./css/font-awesome.min.css";
import "./css/splash.css";
import "./css/style-large.css";
import "./css/style-medium.css";
import "./css/style-small.css";
import "./css/style-xlarge.css";
import "./css/style-xsmall.css";
import "./css/style.css";
import Sync from "twilio-sync";
import bgimg from "./images/signedin.png";
import FadeIn from "react-fade-in";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [signedin, setsignedin] = React.useState(false);

  React.useEffect(() => {
    fetch("https://hfc-nfc-flask.herokuapp.com/token", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        const syncClient = new Sync(data.token);
        syncClient.list("todoList").then((list) => {
          list.on("itemAdded", (e) => {
            setsignedin(true);
          });
        });
      });
  }, [todos]);

  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      setsignedin(true);
      event.preventDefault();
    }

    render() {
      return (
        <section
          id="cover"
          class="min-vh-100"
          style={{
            backgroundImage:
              "url(" +
              "https://freight.cargo.site/t/original/i/a9f227752a9ba3bc689092085a7e6eb87b787abd858c3e3f0aebdc6a40f138d0/Windows_Final_3840p_v10_opt.png" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div id="cover-caption">
            <div class="container">
              <div class="row text-white">
                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center p-4">
                  <div>
                    <img
                      style={{ borderRadius: "50%", width: "40%" }}
                      src="https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                      alt="Thumbnail"
                    />
                  </div>
                  <h2
                    className=" py-2 text-truncate"
                    style={{ fontFamily: "Segoe UI Light" }}
                  >
                    Windows User
                  </h2>
                  <div className="px-2">
                    <form
                      onSubmit={this.handleSubmit}
                      class="justify-content-center"
                    >
                      <div class="form-group">
                        <label class="sr-only">Password</label>
                      </div>
                      <div class="input-group mb-3">
                        <input
                          type="password"
                          class="form-control rounded-0"
                          placeholder="Password"
                          aria-label="Password"
                          value={this.state.value}
                          onChange={this.handleChange}
                          aria-describedby="basic-addon2"
                          style={{
                            backgroundColor: "#263B50",
                            borderColor: "#87A1BC",
                            borderWidth: "2px",
                            fontFamily: "Segoe UI Light",
                            color: "lightgrey"
                          }}
                        />
                        <div class="input-group-append">
                          <span
                            class="input-group-text"
                            id="basic-addon2"
                            style={{
                              backgroundColor: "#6B86A1",
                              borderColor: "#87A1BC",
                              borderWidth: "2px",
                              fontFamily: "Segoe UI Light",
                              borderLeftWidth: "0",
                              padding: "0",
                              marginBottom: "0",
                              fontSize: "1rem",
                              fontWeight: "0",
                              lineHeight: "0.5",
                              color: "#495057",
                              textAlign: "center",
                              whiteSpace: "nowrap"
                            }}
                          >
                            <button
                              type="submit"
                              style={{
                                border: "0",
                                backgroundColor: "#6B86A1",
                                height: "20px",
                                width: "45px"
                              }}
                            >
                              <span
                                class="error_number"
                                style={{
                                  color: "white",
                                  fontSize: "20px"
                                }}
                              >
                                &#129122;
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>

                      <p
                        style={{ paddingTop: 15, fontFamily: "Segoe UI Light" }}
                      >
                        Alternatively, you can use NFC to login
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  function displaypopUp() {
    return (
      <section
        id="cover"
        class="min-vh-100"
        style={{
          backgroundImage: "url(" + bgimg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div id="cover-caption">
          <div class="container">
            <div class="row text-white">
              <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center p-4">
                <div>
                  <img
                    style={{ borderRadius: "50%", width: "40%" }}
                    src="https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                    alt="Thumbnail"
                  />
                </div>
                <h2
                  className=" py-2 text-truncate"
                  style={{ fontFamily: "Segoe UI Light" }}
                >
                  Windows User
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  function displaySignedOut() {
    return <NameForm />;
  }
  function displaySignedIn() {
    //setTimeout(displaypopUp, 1000);
    return (
      <FadeIn transitionDuration="500" onComplete={() => displaypopUp()}>
        <section
          id="cover"
          class="min-vh-100"
          style={{
            backgroundImage: "url(" + bgimg + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        ></section>
      </FadeIn>
    );
  }

  function Display() {
    if (signedin === false) {
      return displaySignedOut();
    } else {
      return displaySignedIn();
    }
  }

  return Display();
}
