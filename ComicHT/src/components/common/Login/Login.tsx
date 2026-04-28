import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  FaFacebook,
  FaGooglePlusG,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import React, { useState } from "react";

import axios from "axios";

import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";

import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

function Login() {
  const dispatch = useDispatch();

  const sizeIcon = 40;
  const navigate = useNavigate();

  // const { login } = useAuth();

  const [check, setCheck] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    pass: "",
    name: "",
  });
  const [error, setError] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { showToast } = useToast();

  function handleClick() {
    setCheck(!check);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  }

  function handleSubmitIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let errorsSubmit = { email: "", pass: "" };
    let check = true;

    if (inputs.email == "") {
      errorsSubmit.email = "Vui lòng nhập email";
      check = false;
    }

    if (!emailRegex.test(inputs.email)) {
      errorsSubmit.email = "Vui lòng nhập email đúng định dạng";
      check = false;
    }

    if (inputs.pass == "") {
      errorsSubmit.pass = "Vui lòng nhập pass";
      check = false;
    }

    if (check) {
      setError({});

      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.pass,
        level: 1,
      };

      axios
        .post("http://localhost:3001/api/user/register", data)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            showToast("Đăng kí thành công!", "success");
          }
        })
        .catch((err) => {
          showToast("Đã xảy ra lỗi khi gửi yêu cầu!", "success");
        });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let errorsSubmit = { email: "", pass: "" };
    let check = true;

    if (inputs.email == "") {
      errorsSubmit.email = "Vui lòng nhập email";
      check = false;
    }

    if (!emailRegex.test(inputs.email)) {
      errorsSubmit.email = "Vui lòng nhập email đúng định dạng";
      check = false;
    }

    if (inputs.pass == "") {
      errorsSubmit.pass = "Vui lòng nhập pass";
      check = false;
    }

    if (check) {
      setError({});

      const data = {
        email: inputs.email,
        password: inputs.pass,
      };

      axios
        .post("http://localhost:3001/api/auth/login", data, {
          withCredentials: true,
        })
        .then((res) => {
          showToast("Đăng nhập thành công!", "success");
          const roleName = res.data.role;

          const nameUser = res.data.name;
          const idUser = res.data.id;

          dispatch(login({ name: nameUser, id: idUser, role: roleName }));

          if (roleName === "admin") {
            navigate("/admin");
          }
          switch (roleName) {
            case "admin":
              navigate("/admin");
              break;

            default:
              navigate("/");
              break;
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Đã xảy ra lỗi khi gửi yêu cầu!");
        });
    }
  }

  return (
    <>
      <div id="inweb">
        <div id="container" className={`${check ? "active" : ""}`}>
          <div className="form-container sign-up">
            <form onSubmit={handleSubmitIn}>
              <h1>Create Account</h1>
              <div className="social-icons flex">
                <a href="#">
                  <FaGooglePlusG className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaFacebook className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaGithub className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaLinkedinIn className="icon" size={sizeIcon} />
                </a>
              </div>
              <span>or use your email for registeration</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleInput}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInput}
              />
              <input
                type="password"
                placeholder="Password"
                name="pass"
                onChange={handleInput}
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              <div className="social-icons flex items-center justify-center">
                <a href="#">
                  <FaGooglePlusG className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaFacebook className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaGithub className="icon" size={sizeIcon} />
                </a>
                <a href="#">
                  <FaLinkedinIn className="icon" size={sizeIcon} />
                </a>
              </div>
              <span>or use your email password</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInput}
              />
              <input
                type="password"
                placeholder="Password"
                name="pass"
                onChange={handleInput}
              />
              <Link className="link-password" to={"/"}>
                Forget Your Password?
              </Link>
              <button>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="btn" id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right" onClick={handleClick}>
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button className="btn" id="register" onClick={handleClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
