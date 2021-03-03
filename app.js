const button = document.querySelector(".submit-button");

button.addEventListener("click", function () {
  const tickerEl = document.getElementById("ticker-search");
  const tickerInput = document.getElementById("ticker-search").value;
  const checked = getChecked();
  if (tickerInput === "") {
    tickerEl.focus();
    return alert("Enter a ticker");
  } else if (checked.length === 0) {
    return alert("Select sites");
  }
  makeLinks(checked, tickerInput);
});

// get URL value from checked checkboxes
const getChecked = () => {
  const checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((e) => e.value);
  return checked;
};

// apply ticker symbol to URL
// TODO get cik as ticker input using getCIK()
// const makeLinks = (checkedVal, tickerInput) => {
//   const linksArr = checkedVal.map((site) => `${site}${tickerInput}`);
//   openSites(linksArr);
// };
const makeLinks = async (checkedVal, tickerInput) => {
  const cik = await cikPromise(tickerInput);
  const linksArr = checkedVal.map((site) => {
    if (
      site === "https://docoh.com/company/" ||
      site === "https://www.sec.gov/cgi-bin/browse-edgar?CIK="
    ) {
      return `${site}${cik}`;
    } else {
      return `${site}${tickerInput}`;
    }
  });
  openSites(linksArr);
};

// open URLs in new tabs in one new window
const openSites = (linksArr) => {
  linksArr.forEach((link) => {
    window.open(link);
  });
};

// ---------
// TODO use indexOf to get cik
const cikPromise = async (tickerInput) => {
  const data = await getJSON();
  const filtered = data.filter((obj) => obj.ticker === tickerInput);
  return filtered[0].cik;
};

const getJSON = async () => {
  const res = await fetch("./CIK/cik-json.json");
  const data = await res.json();
  return data;
};
