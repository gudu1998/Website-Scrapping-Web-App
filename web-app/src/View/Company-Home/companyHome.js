import React, { useState, useEffect } from "react";
import Images from "../../Assets/Images/images";
import "./companyHome.scss";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/baseUrl";
import { useNavigate } from "react-router-dom";

export const CompanyHomeComponent = () => {
  const [websiteDetails, setWebsiteDetails] = useState([]);
  const maxLength = 80;
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const navigateToCompanyDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleCheckboxChange = (id, index) => {
    const newData = websiteDetails.map((item) => {
      if (item._id === id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    const count = newData.filter((item) => item.isChecked).length;
    const selected = newData
      .filter((item) => item.isChecked)
      .map((item) => item._id);
    setSelectedItems(selected);
    setSelectedCount(count);
    setWebsiteDetails(newData);
  };

  const fetchWebsiteDetails = async () => {
    const response = await axios.get(`${baseUrl}/website-scrap`);
    const fetchedData = response.data.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setWebsiteDetails(fetchedData);
  };

  const handleInputChange = (event) => {
    setWebsiteUrl(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveWebsiteDetails();
    }
  };

  const saveWebsiteDetails = async () => {
    setLoader(true);
    await axios
      .post(`${baseUrl}/website-scrap`, {
        websiteUrl: websiteUrl,
      })
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
    fetchWebsiteDetails();
  };

  const deleteWebsiteDetails = async () => {
    setLoader(true);
    await axios
      .get(
        `${baseUrl}/website-scrap/delete?websiteScrapIds=${JSON.stringify(
          selectedItems
        )}`
      )
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
    fetchWebsiteDetails();
    setSelectedCount(0);
  };

  const replacer = (key, value) => (value === null ? "" : value);

  const convertToCSV = (array) => {
    const headers = [
      "title",
      "desc",
      "facebookUrl",
      "twitterUrl",
      "instagramUrl",
      "screenShotPath",
    ];
    const rows = array.map((row) =>
      headers.map((header) => JSON.stringify(row[header], replacer)).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExport = () => {
    const csv = convertToCSV(websiteDetails);
    downloadCSV(csv, "table-data.csv");
  };

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center align-items-center website-spinner">
          <i class="fa fa-spinner fa-spin me-1"></i>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="d-flex flex-column bg-color">
          <div className="d-flex header align-items-center">
            <div className="input-box d-flex">
              <img src={Images.searchIcon} alt="Search Icon" />
              <input
                className="input-control"
                placeholder="Enter domain name"
                value={websiteUrl}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn-fetch d-flex align-items-center"
              onClick={saveWebsiteDetails}
            >
              Fetch & Save Details
            </button>
          </div>

          <div className="table-container d-flex flex-column m-1">
            <div className="d-flex align-items-center actions">
              <span className="me-5 selected-text">
                {selectedCount} selected
              </span>
              <button
                className="btn-delete d-flex align-items-center me-2"
                onClick={deleteWebsiteDetails}
              >
                Delete
              </button>
              <button
                className="btn-export d-flex align-items-center"
                onClick={handleExport}
              >
                <img src={Images.listPlusIcon} alt="List Plus" />
                <span className="export-text">Export as CSV</span>
              </button>
            </div>
            <table>
              <thead className="table-header-bg">
                <tr className="table-border">
                  <th className="table-checkbox-min-width">
                    <input type="checkbox" />
                  </th>
                  <th className="table-header text-center">Company</th>
                  <th className="table-header table-logo-min-width">
                    Social Profiles
                  </th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Address</th>
                  <th className="table-header">Phone No.</th>
                  <th className="table-header">Email</th>
                </tr>
              </thead>
              <tbody>
                {websiteDetails.map((item, index) => (
                  <>
                    <tr key={item._id} className="table-data-bg">
                      <td>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => handleCheckboxChange(item._id, index)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center website-link-width text-center">
                          <img
                            src={item.logo ? item.logo : Images.GlobeIcon}
                            className="website-logo"
                            alt="Website Logo"
                          />
                          <span
                            className="website-link ms-2 cursor-pointer"
                            onClick={() => navigateToCompanyDetails(item._id)}
                          >
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center logo1-gap">
                          <a
                            href={item.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={Images.FacebookIcon}
                              alt="Facebook Icon"
                            />
                          </a>
                          <a
                            href={item.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={Images.TwitterIcon} alt="Twitter Icon" />
                          </a>
                          <a
                            href={item.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={Images.LinkedinIcon}
                              alt="Linkedin Icon"
                            />
                          </a>
                        </div>
                      </td>
                      <td className="table-data">
                        {truncateText(item.desc, maxLength)}
                      </td>
                      <td className="table-data">
                        San Francisco, United States
                      </td>
                      <td className="website-link">(573)-467-7494</td>
                      <td className="website-link">contact@airbnb.com</td>
                      <div className="horizontal-line"></div>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
