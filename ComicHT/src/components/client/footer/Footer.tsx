import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer id="footer-comic" className="text-center">
        <div className="container flex h-full justify-around items-center px-40">
          <div className="logo">
            <Link to="/">LOGO</Link>
          </div>
          <ul className="footer-more flex-wrap">
            <li>
              <FaFacebook size={20} />
            </li>
            <li>
              <FaInstagram size={20} />
            </li>
            <li>
              <FaLinkedin size={20} />
            </li>
          </ul>
          <ul className="footer-more flex-wrap justify-center items-center">
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
          </ul>
          <ul className="footer-more flex-wrap justify-center items-center">
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
          </ul>
          <ul className="footer-more flex-wrap justify-center items-center">
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
          </ul>
          <ul className="footer-more flex-wrap justify-center items-center">
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
            <li>
              <FaArrowRight className="m-3" />
              <p>Nettruyen</p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
