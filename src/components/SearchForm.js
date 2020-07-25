import React, { Component } from "react";

import "./SearchForm.css";
import { Blocker } from "./Blocker";
import { SearchResult } from "./SearchResult";
import { Modal } from "./Modal";

export class SearchForm extends Component {
  state = {
    loading: false,
    message: "",
    countries: [],
    searchResult: null,
    selectedCountry: null,
    searchTerm: "",
  };

  componentDidMount() {
    this.setState({
      loading: true,
      message: "Loading countries...",
    });
    fetch("./mock/countries.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res.statusText;
      })
      .then((countries) => {
        this.setState({
          countries,
          loading: false,
          message: "",
        });
      })
      .catch((reason) => {
        this.setState({
          loading: false,
          message: (
            <div>
              <div>Error loading contries!</div>
              <div>{reason.toString()}</div>
            </div>
          ),
        });
      });
  }

  doSearch = () => {
    const { selectedCountry, searchTerm } = this.state;

    if (!searchTerm) return;

    this.setState({
      loading: true,
      message: "search...",
    });
    fetch(
      `./mock/searchResults.json?country=${selectedCountry}&term=${searchTerm}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res.statusText;
      })
      .then((searchResult) => {
        this.setState({ searchResult, loading: false, message: "" });
      })
      .catch((reason) => {
        this.setState({
          loading: false,
          message: (
            <div>
              <div>Error loading search result!</div>
              <div>{reason.toString()}</div>
            </div>
          ),
        });
      });
  };

  onCountryChange = (e) => {
    this.setState({
      selectedCountry: e.target.value,
    });
  };
  onSearchInputChange = ({ target: { value } }) => {
    this.setState({ searchTerm: value });

    // debouncing logic
    setTimeout(() => {
      if (this.state.searchTerm === value) {
        this.doSearch();
        console.log("searching", value);
      } else {
        clearTimeout(this.timerID);
        console.log("skipping", value);
      }
    }, 200);
  };

  onItemSelect = (id) => {
    console.log({ id });
    this.setState({
      selectedResultItem: this.state.searchResult.find(
        (item) => item.id === id
      ),
    });
  };

  onClosePopupClick = () => {
    this.setState({
      selectedResultItem: null,
    });
  };

  render() {
    const {
      countries,
      loading,
      message,
      selectedCountry,
      searchResult,
      searchTerm,
      selectedResultItem,
    } = this.state;
    return (
      <div className="SearchForm">
        <div className="content">
          <div className="title">Tradeshift Global Search</div>
          <div className="sub-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="form">
            <select className="select-country" onChange={this.onCountryChange}>
              <option value="">Please Select</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="enter something to search..."
              className="search-input"
              disabled={!selectedCountry}
              onChange={this.onSearchInputChange}
            />
          </div>
          <SearchResult
            searchTerm={searchTerm}
            searchResult={searchResult}
            onItemClick={this.onItemSelect}
          />
        </div>
        <Blocker
          loading={loading}
          message={message}
          show={loading || !!message}
        />
        <Modal show={!!selectedResultItem}>
          {selectedResultItem && (
            <div className="panel">
              <header className="panel-header">
                <div className="panel-title">Company Information</div>
                <span className="close-icon" onClick={this.onClosePopupClick}>
                  ✖
                </span>
              </header>
              <section className="panel-body">
                <div className="conpany-info">
                  <div className="company-name">{selectedResultItem.name}</div>
                  <div className="form-item-value">
                    Company Status:{" "}
                    <span className="status">{selectedResultItem.status}</span>
                  </div>

                  <div className="form-item">
                    <label className="form-item-label">
                      COMPANY REGISTRATION NUMBER
                    </label>
                    <div className="form-item-value">
                      {selectedResultItem.registrationNumber}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-item-label">VAT NUMBER</label>
                    <div className="form-item-value">
                      {selectedResultItem.vatNumber}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-item-label">
                      REGISTERED ADDRESS
                    </label>
                    <div className="form-item-value">
                      {selectedResultItem.address}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-item-label">COUNTRY</label>
                    <div className="form-item-value">
                      {selectedResultItem.country}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-item-label">
                      ADDITIONAL STATUS DETAILS
                    </label>
                    <div className="form-item-value">
                      {selectedResultItem.additionalStatusDetails
                        ? selectedResultItem.additionalStatusDetails.map(
                            (info, i) => <div key={i}>{info}</div>
                          )
                        : "-"}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-item-label">
                      COMPANY DESCRIPTION
                    </label>
                    <div className="form-item-value">
                      {selectedResultItem.description}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
