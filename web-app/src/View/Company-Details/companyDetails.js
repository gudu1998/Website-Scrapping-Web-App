import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/baseUrl";
import "./companyDetails.scss";
import Images from "../../Assets/Images/images";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const CompanyDetailsComponent = () => {
  const { id } = useParams();
  const [companyDetails, setCompanyDetails] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    await axios
      .get(`${baseUrl}/website-scrap/websiteid/${id}`)
      .then((res) => {
        console.log(res.data);
        setCompanyDetails(res.data);
      })
      .catch(() => {});
  };

  const navigateToHomePage = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="d-flex flex-column bg-color">
        {!isMobile ? (
          <>
            <div className="d-flex flex-column header">
              <div className="d-flex header align-items-center">
                <div className="input-box d-flex">
                  <img src={Images.searchIcon} alt="Search Icon" />
                  <input
                    className="input-control"
                    placeholder="Enter domain name"
                  />
                </div>
                <button className="btn-fetch d-flex align-items-center">
                  Fetch & Save Details
                </button>
              </div>
              <div className="d-flex align-items-center website-gap">
                <span
                  className="company-name cursor-pointer"
                  onClick={navigateToHomePage}
                >
                  Home
                </span>
                <img src={Images.ChevronRightIcon} alt="Chveron Right Icon" />
                <span className="company-name">{companyDetails.title}</span>
              </div>
            </div>

            <div className="company-details-container d-flex">
              <img
                src={companyDetails.logo}
                alt="Chveron Right Icon"
                className="company-logo"
              />
              <div className="d-flex flex-column company-details-gap">
                <div class="d-flex justify-content-left">
                  <span className="company-text">{companyDetails.title}</span>
                </div>

                <div className="d-flex details-gap">
                  <div className="d-flex flex-column">
                    <div className="d-flex image-gap">
                      <img src={Images.InfoCircleIcon} alt="Info Circle Icon" />
                      <span className="desc-text">Description</span>
                    </div>
                    <div class="d-flex justify-content-left">
                      <span className="desc-max-width desc">
                        {companyDetails.desc}
                      </span>
                    </div>
                  </div>
                  <div className="vertical-line"></div>
                  <div className="d-flex flex-column logo-gap">
                    <div className="d-flex flex-column logo-gap1">
                      <div className="d-flex image-gap">
                        <img src={Images.PhoneCallIcon} alt="Phone Call Icon" />
                        <span className="desc-text">Phone</span>
                      </div>
                      <div class="d-flex justify-content-left">
                        <span className="desc">(573)-456-4644</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column logo-gap1">
                      <div className="d-flex image-gap">
                        <img
                          src={Images.MailSearchIcon}
                          alt="Mail Search Icon"
                        />
                        <span className="desc-text">Email</span>
                      </div>
                      <div class="d-flex justify-content-left">
                        <span className="desc">contact@netflix.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex flex-column header">
              <div className="d-flex flex-column  header-gap">
                <div className="input-box d-flex">
                  <img src={Images.searchIcon} alt="Search Icon" />
                  <input
                    className="input-control"
                    placeholder="Enter domain name"
                  />
                </div>
                <button className="btn-fetch d-flex justify-content-center align-items-center">
                  Fetch & Save Details
                </button>
                <div className="d-flex align-items-center website-gap">
                  <span
                    className="company-name cursor-pointer"
                    onClick={navigateToHomePage}
                  >
                    Home
                  </span>
                  <img src={Images.ChevronRightIcon} alt="Chveron Right Icon" />
                  <span className="company-name">{companyDetails.title}</span>
                </div>
              </div>
            </div>

            <div className="company-details-container d-flex flex-column">
              <img
                src={companyDetails.logo}
                alt="Chveron Right Icon"
                className="company-logo"
              />
              <div className="d-flex flex-column company-details-gap">
                <div class="d-flex justify-content-left">
                  <span className="company-text">{companyDetails.title}</span>
                </div>

                <div className="d-flex flex-column logo-gap">
                  <div>
                    <div className="d-flex image-gap">
                      <img src={Images.InfoCircleIcon} alt="Info Circle Icon" />
                      <span className="desc-text">Description</span>
                    </div>
                    <div class="d-flex justify-content-left mt-1">
                      <span className="desc-max-width desc">
                        {companyDetails.desc}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex image-gap">
                      <img src={Images.PhoneCallIcon} alt="Phone Call Icon" />
                      <span className="desc-text">Phone</span>
                    </div>
                    <div class="d-flex justify-content-left mt-1">
                      <span className="desc-max-width desc">
                        (573)-456-4644
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex image-gap">
                      <img src={Images.MailSearchIcon} alt="Info Circle Icon" />
                      <span className="desc-text">Email</span>
                    </div>
                    <div class="d-flex justify-content-left mt-1">
                      <span className="desc-max-width desc">
                        contact@netflix.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="d-flex flex-sm-row flex-column">
          <div className="d-flex flex-column screenshot-container  m-1 logo-gap">
            <span className="wrapper-text">Company Details</span>
            <div>
              <div className="d-flex image-gap">
                <img src={Images.GlobeIcon} alt="Globe Icon" />
                <span className="desc-text">Website</span>
              </div>
              <div className="desc mt-1">{companyDetails.websiteUrl}</div>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.InfoCircleIcon} alt="Info Icon" />
                <span className="desc-text">Description</span>
              </div>
              <div className="desc mt-1">{companyDetails.desc}</div>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.LocationMarkerIcon} alt="Location Icon" />
                <span className="desc-text">Email</span>
              </div>
              <div className="desc mt-1">contact@netflix.com</div>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.facebookIcon} alt="Facebook Icon" />
                <div className="desc-text">Facebook</div>
              </div>
              <a
                href={companyDetails.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="desc-link mt-1">
                  {companyDetails.facebookUrl}
                </div>
              </a>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.InstagramIcon} alt="Instagram Icon" />
                <span className="desc-text">Instagram</span>
              </div>
              <a
                href={companyDetails.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="desc-link mt-1">
                  {companyDetails.instagramUrl}
                </div>
              </a>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.twitterIcon} alt="Twitter Icon" />
                <span className="desc-text">Twitter</span>
              </div>
              <a
                href={companyDetails.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="desc-left"
              >
                <div className="desc-link mt-1">
                  {companyDetails.twitterUrl}
                </div>
              </a>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.linkedinIcon} alt="Linkedin Icon" />
                <span className="desc-text">Linkedin</span>
              </div>
              <a
                href={companyDetails.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="desc-link mt-1">
                  {companyDetails.linkedinUrl}
                </div>
              </a>
            </div>

            <div>
              <div className="d-flex image-gap">
                <img src={Images.LocationMarkerIcon} alt="Location Icon" />
                <div className="desc-text">Address</div>
              </div>
              <div className="desc mt-1">Francisco</div>
            </div>
          </div>

          <div className="d-flex flex-column screenshot-container  m-1">
            <div className="d-flex align-items-center">
              <img src={Images.CameraIcon} alt="Camera Icon" />
              <span className="screenshot-text ms-2">
                Screenshot of Webpage
              </span>
            </div>
            <img
              src={companyDetails.screenShotPath}
              alt="ScreenShotPath"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};
